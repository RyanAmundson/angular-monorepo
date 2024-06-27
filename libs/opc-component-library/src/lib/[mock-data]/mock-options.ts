import { signal } from "@angular/core";
import { Option, OptionActions, OptionSaleTypes } from "../[models]/models";


export const mockCallOption: Option = {
  id: '1',
  tradierSymbol: 'AAPL150',
  ticker: 'AAPL',
  underlyingStockPrice: 150.25,
  type: 'option', // from tradier
  expiry: '2023-12-31',
  strike: 150,
  last: 5.10,
  bid: 5.00,
  ask: 5.20,
  impliedVolatility: 0.25,
  openInterest: 1000,
  currentOptionPrice: 5.15,
  callOrPut: 'C',
  buyOrSell: OptionActions.Buy,
  delta: 0.5,
  gamma: 0.1,
  vega: 0.2,
  rho: 0.01,
  covered: false,
  coveredOrNaked: OptionSaleTypes.Naked,
  greeks: {
    smv_vol: '0.3',
    delta: '0.5',
    gamma: '0.1',
    theta: '0.2',
  },
  date: '2023-01-01',
  count: signal(1),
}

export const mockPutOption: Option = {
  id: '1',
  tradierSymbol: 'AAPL150',
  ticker: 'AAPL',
  underlyingStockPrice: 150.25,
  type: 'option', // from tradier
  expiry: '2023-12-31',
  strike: 150,
  last: 5.10,
  bid: 5.00,
  ask: 5.20,
  impliedVolatility: 0.25,
  openInterest: 1000,
  currentOptionPrice: 5.15,
  callOrPut: 'P',
  buyOrSell: OptionActions.Buy,
  delta: 0.5,
  gamma: 0.1,
  vega: 0.2,
  rho: 0.01,
  covered: false,
  coveredOrNaked: OptionSaleTypes.Naked,
  greeks: {
    smv_vol: '0.3',
    delta: '0.5',
    gamma: '0.1',
    theta: '0.2',
  },
  date: '2023-01-01',
  count: signal(1),
}