import { CallOrPut, Option, TradierOption } from "../[models]/models";


export class TradierUtility {


  public static mapTradierOption(tOpt: TradierOption): Option {
    if(tOpt == null) {
      console.warn("TradierUtility.mapTradierOption received null option", tOpt);
    }

    const op = <Option>{
      id: Option.generateUniqueKey(tOpt.underlying, tOpt.expiration_date, tOpt.strike, <CallOrPut>tOpt.option_type[0].toUpperCase()),
      tradierSymbol: tOpt.symbol ?? Option.generateTradierSymbol(tOpt.underlying, tOpt.expiration_date, tOpt.strike, <CallOrPut>tOpt.option_type[0].toUpperCase()),
      ticker: tOpt.underlying,
      type: tOpt.type,
      expiry: tOpt.expiration_date,
      strike: tOpt.strike,
      last: tOpt.last,
      bid: tOpt.bid,
      ask: tOpt.ask,
      openInterest: tOpt.open_interest,
      currentOptionPrice: tOpt.last,
      callOrPut: tOpt.option_type[0].toUpperCase(),
      greeks: tOpt.greeks,
      date: new Date().getTime().toString()
    };
    return op;
  }

}
