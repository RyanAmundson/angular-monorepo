import { Injectable, Signal, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { debounceTime, map, shareReplay, switchMap } from "rxjs/operators";
import { lastValueFrom, of } from "rxjs";
// import { debug } from "../_decorators/debug.decorator";
// import { KnownErrorDetails, KnownErrors } from "../_models/known-errors";

// import { CacheService } from "./cache.service";
import { Expiration, KnownErrorDetails, KnownErrors, Option, Ticker, TradierOption, TradierOptionChainResponse, TradierSymbol } from "../[models]/models";
import { TradierUtility } from "../[utilities]/tradier.utility";

// @debug(false)
@Injectable({
  providedIn: 'root'
})
export class TradierService {


  public http: HttpClient = inject(HttpClient);
  public baseUrl = "https://sandbox.tradier.com";

  // token not required for sandbox api and will fail CORS if included
  defaultHttpConfig: HttpHeaders = new HttpHeaders({
    Authorization: "Bearer vhelrOcGiNAYi6XnpM3z4IU93oi4",
    "Content-Type": "application/x-www-form-urlencoded",
    // token:
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiI5NGI5NzViZThjNTE3M2E5OTUyMDU0OTkxYTc1MTIxMGY4Y2YwMTE3MWQ4YmJmYTM5NTVmMGEyNjZjMjc2ZGQ0IiwiaWF0IjoxNDk2NzEzOTIxfQ.Ect0PtFO_Yy6he5c9T0W_ckmm-8HyLEdChru2ywI1EE",
    Accept: "application/json"
  });


  public async getOptionChain(ticker: Ticker, expiration: Expiration): Promise<Option[]> {

    const underlyingStockPrice = await this.getUnderlying(ticker);

    return lastValueFrom(
      this.http.get<TradierOptionChainResponse>(`${this.baseUrl}/v1/markets/options/chains`, {
        params: {
          symbol: ticker,
          expiration: expiration.toString(),
          greeks: "true"
        },
        headers: this.defaultHttpConfig
      })
    )
      .then((res: TradierOptionChainResponse): TradierOption[] => {
        return res.options.option;
      })
      .then((res: TradierOption[]): Option[] => {
        const mappedOptions = res.map((tOpt: TradierOption) => {
          const op = TradierUtility.mapTradierOption(tOpt);
          op.underlyingStockPrice = underlyingStockPrice;
          return op;
        });

        return mappedOptions;
      })
      .catch(err => {
        // log error to logging service
        return err;
      });
  }

  public getOptionExpirations(ticker: string): Promise<Expiration[]> {
    const config = {
      params: {
        symbol: ticker
      },
      headers: this.defaultHttpConfig
    };

    return lastValueFrom(this.http
      .get(`https://sandbox.tradier.com/v1/markets/options/expirations`, config)
    )
      .then((exp: any) => {
        if (exp && exp.expirations) {
          exp = exp.expirations.date;
          return exp;
        } else {
          return null;
        }
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  public getOptionStrikes(ticker: string, expiration: Expiration): Promise<any> {
    const config = {
      params: {
        symbol: ticker,
        expiration: expiration.toString()
      },
      headers: this.defaultHttpConfig
    };

    return this.http
      .get(`https://sandbox.tradier.com/v1/markets/options/strikes`, config)
      .toPromise()
      .then((strikes: any) => {
        strikes = strikes.strikes.strike;
        return strikes.reverse();
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  getQuote(symbol: string): Promise<any> {
    if (symbol === "NULL" || symbol === null || symbol === undefined || symbol === 'null' || symbol === 'undefined') {
      // throw `Trying to get quote for '${symbol}' symbol`;
      return Promise.resolve(null);
    };

    const config = {
      params: {
        symbols: symbol,
        greeks: true
      },
      headers: this.defaultHttpConfig
    };

    return lastValueFrom(this.http
      .get(`https://sandbox.tradier.com/v1/markets/quotes`, config))
      .then((quote: any) => {
        if (quote.quotes.unmatched_symbols) {
          throw KnownErrorDetails.getError(KnownErrors.TradierReturnedUnmatchedsymbol, { additionalInfo: { symbol: symbol, quote: quote } });
        }
        quote = quote.quotes.quote;
        return quote;
      }).catch(err => {
        if (err == KnownErrors.TradierReturnedUnmatchedsymbol) {
          console.error(err.message, err.reason);
        } else {
          throw err;
        }
      })
  }

  getUnderlying(ticker: string): Promise<number> {
    if (ticker == null) {
      console.warn("TradierService.getUnderlying received null ticker", ticker);
      throw new Error("TradierService.getUnderlying received null ticker");
    }

    return this.getQuote(ticker)
      .then(ticker => ticker.last)
      .then(underlying => Number.parseFloat(underlying))
      .then(underlying => {
        return underlying;
      });
  }

  searchCompanies(search: string) {
    return of(search).pipe(
      map((search) => ({
        params: {
          q: search,
          exchanges: 'Q,N',
        },
        headers: this.defaultHttpConfig
      })),
      debounceTime(1000),
      switchMap((config) =>
        this.http.get(`https://sandbox.tradier.com/v1/markets/lookup`, config)
      ),
      map((res: any) => {
        if (res.securities && !Array.isArray(res.securities.security)) {
          res.securities.security = [res.securities.security];
        }
        const tickers = res.securities.security.map((s: { symbol: string, description: string }) => ({ symbol: s.symbol, desc: s.description }));
        return tickers;
      }),
      shareReplay(1)
    );
  }

  fetchTimeSales(ticker: string, interval: string, start: string, end: string): Promise<any> {
    const config = {
      params: {
        symbol: ticker,
        interval: interval,
        start: start,
        end: end,
        session_filter: 'open'
      },
      headers: this.defaultHttpConfig
    };

    return lastValueFrom(
      this.http.get(`https://sandbox.tradier.com/v1/markets/timesales`, config)
    )
      .then((quote: any) => {
        return quote;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  fetchMarketHistory(ticker: string, interval: string, start: string, end: string): Promise<any> {
    const config = {
      params: {
        symbol: ticker,
        interval: interval,
        start: start,
        end: end,
        session_filter: 'open'
      },
      headers: this.defaultHttpConfig
    };

    return lastValueFrom(this.http
      .get(`https://sandbox.tradier.com/v1/markets/history`, config)
    )
      .then((quote: any) => {
        return quote;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  /**
   *   * Fetches the option chain for a given ticker and expiration date
   * @param ticker  The ticker symbol
   * @param TradierLookupTypes  The type of lookup to perform
   * @param exchanges  The exchanges to search for the ticker
   * @returns 
   */
  lookup(ticker: string, TradierLookupTypes: TradierLookupType[], exchanges?: TradierExchanges[]): Promise<TradierSymbol[]> {
    return lastValueFrom(
      this.http.get<TradierLookupResponse>(`https://sandbox.tradier.com/v1/markets/options/lookup`, {
        params: {
          underlying: ticker,
          types: TradierLookupTypes.join(','),
          exchanges: exchanges?.join(',') ?? 'Q,N'
        },
        headers: this.defaultHttpConfig
      })
    ).then((result: TradierLookupResponse) => result?.symbols[0]?.options)

  }

  fetchMarketStatus(): Promise<string> {
    return lastValueFrom(this.http.get<string>(`${this.baseUrl}/v1/markets/clock`, {
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace YOUR_ACCESS_TOKEN with your Tradier access token
        'Accept': 'application/json'
      }
    }));
  }
}





export function timeAndSalesIntervalFormat(daysBeforeToday: number) {
  const today = new Date();
  const endDate = new Date(today); // Copy today's date

  // Start date is 'daysBeforeToday' days before today
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - daysBeforeToday);

  const marketOpenTime = "09:30";
  const marketCloseTime = "16:00";

  const startYear = startDate.getFullYear().toString();
  const endYear = endDate.getFullYear().toString();

  const startMonth = startDate.getMonth() + 1 < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1).toString();
  const endMonth = endDate.getMonth() + 1 < 10 ? "0" + (endDate.getMonth() + 1) : (endDate.getMonth() + 1).toString();

  const startDay = startDate.getDate() < 10 ? "0" + startDate.getDate() : startDate.getDate().toString();
  const endDay = endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate().toString();

  const startInterval = `${startYear}-${startMonth}-${startDay} ${marketOpenTime}`;
  const endInterval = `${endYear}-${endMonth}-${endDay} ${marketCloseTime}`;

  return [startInterval, endInterval];
}


export enum TradierLookupType {
  Stock = "stock", Option = "option", ETF = "etf", Index = "index"
}

export enum TradierExchanges {
  Q = "Q", N = "N"
}


export interface TradierLookupResponse {
  symbols: [
    {
      options: string[],
      rootSymbol: string,
    }
  ];
}
