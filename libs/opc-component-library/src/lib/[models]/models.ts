import { Signal, WritableSignal, signal } from "@angular/core";
import { Observable } from "rxjs";

export interface OptionRange {
  startDate: string;
  endDate: string;
  optionExpiryGroups: OptionExpiryGroup[];
}

// options for given date
export class OptionExpiryGroup {
  _options?: Option[];
  constructor(expiry: string) {
    this.expiry = expiry;
  }
  stockPrice?: number;
  expiry?: string;
  calls?: Option[];
  puts?: Option[];
  get options(): Option[] {
    if (this._options) return this._options;
    else return [];
  }
  set options(options: Option[]) {
    if (!options) throw new Error('options is null');
    this.calls = options
      .filter(option => option.callOrPut === "C")
      .sort((a: Option, b: Option) => a.strike && b.strike ? b?.strike - a?.strike : 0);
    this.puts = options
      .filter(option => option.callOrPut === "P")
      .sort((a: Option, b: Option) => a.strike && b.strike ? b?.strike - a?.strike : 0);
    this._options = options;
  }
}

export enum PremiumOrProfit {
  Profit,
  Premium
}


export enum OptionActions {
  Buy = "B",
  Sell = "S",
  Neutral = "N"
}

export class Option {
  id?: string;
  tradierSymbol?: string;
  ticker?: string;
  underlyingStockPrice?: number;
  type?: string; // this is just 'option' from tradier
  expiry?: Expiration;
  strike = 0;
  last?: number;
  bid = 0;
  ask = 0;
  impliedVolatility?: number | Promise<number>;
  openInterest = 0;
  currentOptionPrice?: number;
  callOrPut: OptionType | null = null;
  buyOrSell?: BuyOrSell | OptionActions;
  delta?: number;
  gamma?: number;
  vega?: number;
  rho?: number;
  covered?: boolean;
  coveredOrNaked?: OptionSaleTypes;
  greeks?: {
    smv_vol: string;
    delta: string;
    gamma: string;
    theta: string;
  };
  date?: string;
  count: Signal<number> = signal(0);

  static premium(option: Option): number {
    if (!option) throw "can't calculate premium, option is null.";
    if (!option.bid || !option.ask) throw "can't calculate premium, bid or ask is null.";
    return Number.parseFloat((((option.bid + option.ask) / 2) * 100).toFixed(2));
  }

  static premiumPerShare(option: Option): number {
    if (!option) throw "can't calculate premium, option is null.";
    if (!option.bid || !option.ask) throw "can't calculate premium, bid or ask is null.";
    return Number.parseFloat(((option.bid + option.ask) / 2).toFixed(2));
  }

  static cost(option: Option, buyOrSell: OptionActions) {
    if (!option) throw "can't calculate premium, option is null.";
    if (!option.bid || !option.ask) throw "can't calculate premium, bid or ask is null.";
    const absoluteCost = Math.abs(Number.parseFloat(
      (((option.bid + option.ask) / 2)).toFixed(2))
    );
    if (buyOrSell === OptionActions.Buy) {
      return -absoluteCost;
    } else if (buyOrSell === OptionActions.Sell) {

      return absoluteCost;
    }
    return 0;
  }

  static generateId(
    ticker: Ticker,
    expiration: Expiration,
    strike: Strike,
    callOrPut: CallOrPut,
    underlyingStockPrice: number) {
    return `${ticker}:${expiration}:${strike}:${callOrPut}:${underlyingStockPrice}`.toLowerCase();
  }

  static parseId(id: string): Partial<Option> {
    const split = id.split(":");
    const parsedOption = <Partial<Option>>{
      id: id,
      ticker: split[0],
      expiry: split[1],
      strike: Number.parseFloat(split[2]),
      callOrPut: split[3],
      underlyingStockPrice: Number.parseFloat(split[4])
    }

    return parsedOption;
  }

  /**
   * This fails on march 1st 2024 expiration, actually produces 20240229, should move away from generating the symbol and rather use it throughout from tradier
   * @param ticker 
   * @param expiration 
   * @param strike 
   * @param callOrPut 
   * @returns 
   */

  static generateTradierSymbol(ticker: Ticker, expiration: Expiration, strike: Strike, callOrPut: CallOrPut) {
    const expiryAsDate = new Date(expiration);
    const twoDigitYear = expiryAsDate.getFullYear().toString().slice(2);
    const twoDigitMonth = (expiryAsDate.getMonth() + 1).toString().padStart(2, '0');
    const twoDigitDay = (expiryAsDate.getDate() + 1).toString().padStart(2, '0');
    const eightDigitStrike: string = strike.toFixed(3).replace('.', '').padStart(8, '0');

    return `${ticker}${twoDigitYear}${twoDigitMonth}${twoDigitDay}${callOrPut}${eightDigitStrike}`;
  }



  // deprecated
  static generateUniqueKey(
    ticker: Ticker,
    expiration: Expiration,
    strike: Strike,
    callOrPut: CallOrPut
  ): string {
    return `${ticker}:${expiration}:${strike}:${callOrPut}`.toLowerCase();
  }

  // deprecated
  static parseUniqueKey(key: string) {
    return key.split(":");
  }
}

/**
 * Option in the future
 *
 * bid, ask, etc unknown
 */
export class HypotheticalOption extends Option {
  originalOption?: Option;
  hypotheticalPremium?: Premium;
  timeToMaturity?: number; // days until expiration
  multiplier?: number; // if multiple contracts
  percentOfOriginalPremium?: number; // percent of premium to use

  static profit(option: HypotheticalOption, allContracts?: boolean): number {
    let profit = 0;
    if (!option) throw new Error('option is null');
    if (!option.originalOption) throw new Error('originalOption is null');
    if (!option.hypotheticalPremium) throw new Error('hypotheticalPremium is null');
    if (!option.multiplier) throw new Error('multiplier is null');

    if (option && option.buyOrSell === OptionActions.Sell || option?.multiplier < 0) {
      profit = Option.premium(option?.originalOption) - option?.hypotheticalPremium;
    } else if (option.buyOrSell === OptionActions.Buy || option.multiplier > 0) {
      profit = option?.hypotheticalPremium - Option.premium(option?.originalOption);
    }
    return allContracts ? profit * option?.multiplier : profit;
  }
}

export interface HypotheticalOptionWithPremium extends HypotheticalOption {
  hypotheticalPremium: Premium;
}

// export interface hypotheticalPutOption extends HypotheticalOption {

// }

// export interface hypotheticalCallOption extends HypotheticalOption {

// }







export interface TradierOption {
  ask: number;
  ask_date: number;
  askexch: string;
  asksize: number;
  average_volume: number;
  bid: number;
  bid_date: number;
  bidexch: string;
  bidsize: number;
  change: null;
  change_percentage: null;
  close: number;
  contract_size: number;
  description: string;
  exch: string;
  expiration_date: string;
  expiration_type: string;
  high: number;
  last: number;
  last_volume: number;
  low: number;
  open: number;
  open_interest: number;
  option_type: string;
  prevclose: null;
  root_symbol: string;
  strike: number;
  symbol: string;
  trade_date: number;
  type: string;
  underlying: string;
  volume: number;
  week_52_high: number;
  week_52_low: number;
  greeks?: any;
}

export interface TradierOptionData {
  symbol: string;
  strike: string;
  last: string;
  bid: string;
  ask: string;
  change: string; // daily net change
  open_interest: string;
}

export interface ProfitCalculateParams {
  stock: string;
  optionAction: string;
  currentPrice: string;
  currentOptionPrice: string;
  numContracts: string;
  optionType: string;
  optionExpiry: string;
  optionStrike: string;
  optionIV: string;
  rangeMin: string;
  rangeMax: string;
  graphType: string;
  calculationDate: string;
  graphTypeChange: string;
  underlyingStockPrice: string;
  tabId: string;
  reqId: string;
}

export interface MultiLegCalculateParams {
  shortestOptionExpiry: string;
  underlyingSymbol: string;
  underlyingCurPrice: string;
  optionLegs: OptionLeg[];
  rangeMin: string;
  rangeMax: string;
  graphType: string;
  calculationDate: string;
  graphTypeChange: string;
  tabId: string;
  reqId: string;
}

export interface OptionLeg {
  legact: string;
  legprice: string;
  legcurprice: string;
  legnum: string;
  legoptype: string;
  legexpiry: string;
  legstrike: string;
  legiv: string;
}

export interface DataSourceEntry {
  value: number;
  color: string;
}

export class OptionsData {
  underlyingStockPrice?: number;
  optionExpiryGroups?: OptionExpiryGroup[];
}

export class OptionsChain {
  underlyingStockPrice?: number;
  expirations?: Expiration[];
  strikes?: Strike[];
  optionMap: Map<OptionMapKey, Option> = new Map();

  static generateOptionMapKey(
    expiration: Expiration,
    strike: Strike,
    callOrPut: CallOrPut
  ) {
    return `${expiration}:${strike}:${callOrPut}`;
  }
}

export type OptionMap = Map<OptionMapKey, Option>;
export type OptionMapKey = string;
export type CallOrPut = "C" | "P";
export type BuyOrSell = "B" | "S";
export type Expiration = Date | string;
export type Strike = number;
export type Ticker = string;
export interface TradierOptionChainResponse {
  options: { option: TradierOption[] };
}

export type OptionType = "C" | "P";

export type HowMany = number;


export class ProfitTable {
  ticker?: Ticker;
  underlyingStockPrice?: number;
  optionsIncluded?: Map<Option, number> | Set<Option>;
  xAxis?: Expiration[];
  yAxis?: Strike[];
  // dataMap: Map<ExpiryStrikeKey, Promise<number> | number>;
  data$?: Observable<{ input: HypotheticalOption, output: Premium }>;

  static generateKey(expiry: Expiration, strike: Strike): ExpiryStrikeKey {
    return `${expiry}:${strike}`;
  }

  static parseKey(key: ExpiryStrikeKey): { expiry: Expiration, strike: Strike } {
    const res: string[] = key.split(':');
    return { expiry: res[0], strike: Number.parseFloat(res[1]) };
  }
}
export type ExpiryStrikeKey = string;

export interface GradientTableParams {
  xAxis: (Date | Expiration)[];
  yAxis: (Strike | number)[];
  data?: Map<string, number>;
  data$: Observable<{ input: HypotheticalOption, output: Premium }>;
  optionsIncluded?: HypotheticalOption;
  baseline?: number;
  netCost$?: Observable<number>;
  highestValue?: number;
  lowestValue?: number;
  gradientStops?: string[];
  gradientMap?: Map<number, string>;
  xPOIs?: Date[];
  yPOIs?: number[];
}

export enum OptionTypes {
  Call = "C",
  Put = "P"
}

export enum OptionSaleTypes {
  Covered = 'C',
  Naked = 'N'
}

export class Float {
  parse(string: string) {
    return Number.parseFloat(string);
  }
}

export interface ProfitCalcData {
  option: Option;
  strike: Strike,
  underlyingStockPrice: number;
  timeToMaturity?: number;
  multiplier: number;
  dateToEvaluate: string;
}


export enum ContractType {
  CoveredCallSale,
  NakedCallSale,
  CallPurchase,

  CoveredPutSale,
  NakedPutSale,
  PutPurchase,
}

export enum OptionStrategy {
  LongCall = "Long Call",
  CoveredCall = "Covered Call",
  NakedCall = "Naked Call",
  CoveredPut = "Covered Put",
  NakedPutSale = "Naked Put",
  PutSpread = "Put Spread",
  CallSpread = "Call Spread",
  DiagnolSpread = "Diagonal Spread",
  CalendarSpread = "Calendar Spread",
  IronCondor = "Iron Condor",
  MarriedPut = "Married Put",
  BullCallSpread = "Bull Call Spread"

}

export type Premium = number;

export type Strategy = OptionStrategy;

export type TradierSymbol = string;

export enum ExitStatus {
  exitNotStarted = 'exitNotStarted',
  exitStarted = 'exitStarted',
  exitAnimationStarted = 'exitAnimationStarted',
  exitAnimationDone = 'exitAnimationDone',
  readyToExit = 'readyToExit'
}


export interface HypotheticalOptionsResult {
  ticker: Ticker;
  totalCost: number;
  totalPremium: number;
  totalProfit: number;
  totalContracts: number;
  percentOfPremium: number;
  hypotheticalOptionResults: HypotheticalOptionResult[];
  hypotheticalOptions: HypotheticalOption[];
  originalOptions: Option[];
}

export interface HypotheticalOptionResult {
  x: string, y: string;
  totalCost: number;
  totalPremium: number;
  totalProfit: number;
  totalContracts: number;
  percentOfPremium: number;
  hypotheticalOption: HypotheticalOption;
  originalOption: Option;
}


export enum WizardStep {
  SelectTicker = 0,
  SelectOptions = 1,
  ProfitCalculationResult = 2
}

export enum KnownErrors {
  PremiumCalculationReturnedNaN,
  TradierReturnedUnmatchedsymbol
}

export class KnownErrorDetails {
  public static getError(error: KnownErrors, additionalInfo: any): Error {
    switch (error) {
      case KnownErrors.PremiumCalculationReturnedNaN:
        return new PremiumCalculationReturnedNaN(additionalInfo);
      case KnownErrors.TradierReturnedUnmatchedsymbol:
        return new TradierReturnedUnmatchedsymbol(additionalInfo);
    }
  }
}


export class PremiumCalculationReturnedNaN extends Error {

  constructor(additionalInfo: any) {
    super();
    this.message = "Premium calculation returned NaN";
    this.reason = "Division by zero or missing inputs likely";
    this.additionalInfo = additionalInfo;
  }
  override message = "Premium calculation returned NaN";
  reason = "Division by zero or missing inputs likely";
  additionalInfo = {};
}


export class TradierReturnedUnmatchedsymbol extends Error {

  constructor(additionalInfo: any) {
    super();
    this.message = "Tradier returned unmatched symbol error";
    this.reason = "invalid symbol or potentially throttling";
    this.additionalInfo = additionalInfo;
  }
  override message = "Tradier returned unmatched symbol error";
  reason = "invalid symbol or potentially throttling";
  additionalInfo = {};
}
