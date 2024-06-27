import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  animateChild,
  state,
  keyframes,
  group,
  sequence
} from "@angular/animations";
import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  OnChanges,
  QueryList,
  ViewChildren,
  SimpleChanges,
  inject,
  signal,
  computed,
  input,
  output,
  effect,
  Signal
} from "@angular/core";
// import {
//   Option,
//   Expiration,
//   Strike,
//   OptionMapKey,
//   OptionType,
//   BuyOrSell,
//   OptionSaleTypes,
//   Ticker,
//   TradierSymbol
// } from "../../../_models/models";
// import { TradierService } from "@services/tradier.service";
import { defer, map, Observable, switchMap, tap } from "rxjs";
// import { SettingsService } from "../../_settings/settings.service";
// import { SelectedOptionsService } from "@services/selected-options.service";
import { ActivatedRoute, Router } from "@angular/router";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
// import { AppStateService } from "@services/app-state.service";
// import { ContractsService } from "@services/contracts.service";
import { OptionCardComponent } from "../option-card/option-card.component";
import { Expiration, Option, OptionActions, OptionSaleTypes, OptionType, Strike, Ticker, TradierSymbol } from "../../[models]/models";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule, DatePipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TradierService } from "../../[services]/tradier.service";




@Component({
  selector: "opc-option-explorer",
  templateUrl: "./option-explorer.component.html",
  styleUrls: ["./option-explorer.component.scss"],
  standalone: true,
  imports: [
    OptionCardComponent,
    MatToolbarModule,
    MatTabsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,

  ],
  providers: [DatePipe,],
  animations: [
    trigger("raiseLower", [
      transition(":enter", [
        style({
          'box-shadow': '0 0 0 black',
          'background-color': '#292929'
        }),
        animate('500ms',
          style({
            'box-shadow': '*',
            'background-color': '*'
          }))
      ]),
      transition(":leave", [
        style({
          'box-shadow': '*',
          'background-color': '*'
        }),
        animate('500ms',
          style({
            'box-shadow': '0 0 0 black',
            'background-color': '#292929'
          }))
      ]),
    ]),

    /**
     * cards are preloaded so they don't animate in
     */
  ]
})

export class OptionExplorerComponent {

  /** DI */
  private tradier: TradierService = inject(TradierService);
  // public ASS: AppStateService = inject(AppStateService);
  // public readonly settings: SettingsService = inject(SettingsService);
  // public selectedOptionsService: SelectedOptionsService = inject(SelectedOptionsService);
  // public contractsService: ContractsService = inject(ContractsService);

  /** IO */
  ticker = input('');
  callsOrPuts = input('C');

  selectedSymbols = output();

  /** template refs */
  @ViewChild("tabContent", { static: false }) tabContent?: ElementRef;
  @ViewChildren("strikeMarker") strikeMarker?: QueryList<ElementRef>;


  /**Outside Settings */
  // maxStrikesToShow = this.settings.fetch("numberOfStrikesPerExpiration").for(typeof OptionExplorerComponent) || 15;
  preloadCount = 2;   // home many tabs to preload

  /** Class Properties */
  allContracts = signal([]);



  // expirations$?: Promise<Expiration[]>;
  strikes$?: Promise<Strike[]>;
  strikeMap: Map<Expiration, Promise<Strike[]>> = new Map();

  // expirations = computed(() => this.tradier.getOptionExpirations(this.ticker()))
  expirations$ = toObservable(this.ticker).pipe(
    switchMap((tkr) => this.tradier.getOptionExpirations(tkr)), 
    tap((expirations) => this.currentExpiration.set(<string>expirations[0]))
  );
  expirations = toSignal<Expiration[]>(this.expirations$);

  currentExpiration = signal('');
  currentTab = signal(0);

  contracts = new Map<Expiration, Option[]>();

  fetchContractsEffect = effect(async () => {
    if (!this.currentExpiration()) return;
    if (this.contracts.has(this.currentExpiration())) return;

    this.contracts.set(
      this.currentExpiration(),
      await this.tradier.getOptionChain(this.ticker(), this.currentExpiration())
    );

    /**
     * Fetch all at once
     */
    // this.expirations()?.forEach(async (expiration: Expiration) => {
    //   if (this.expirationToContracts.has(expiration)) return;
    //   this.expirationToContracts.set(
    //     expiration,
    //     signal(await this.tradier.getOptionChain(this.ticker(), expiration))
    //   );
    // });
  })
  /**
   * The current expiration that is being viewed (tab)
   */


  markerIndex: Map<Expiration, number> = new Map();
  underlying = computed(async () => await this.tradier.getUnderlying(this.ticker()));
  tabsLoaded = new Set();
  // selectedOptionsByExpiration$: Observable<Map<Expiration, { bought:number, sold:number, total:number, options:Option[] }>> = this.selectedOptionsService.selectedOptionsByExpiration$;
  // selectedOptions = this.selectedOptionsService.selectedOptions;
  // selectedOptionCounts = this.ASS.selectedOptions();
  superNestedMap = new Map();
  showStrikeMarker = signal(false);
  showOptions = signal(false);



  // ngOnChanges(simpleChanges: SimpleChanges): void {
  //   if ((simpleChanges["ticker"]) && this.ticker != null) {
  // this.reset();
  // this.underlying$ = <any>this.tradier?.getUnderlying(this.ticker);
  // this.expirations$ = <any>this.tradier?.getOptionExpirations(this.ticker);
  // this.expirations$?.then((expirations: Expiration[]) => {
  //   this.expirations = expirations;
  // let expirationsToLoad = this.expirations?.slice(
  //   Math.max(this.currentTab - this.preloadCount, 0),
  //   this.currentTab + this.preloadCount
  // )
  //     ?.filter(eTL => this.checkIfAlreadyLoaded(eTL) == false);
  //   this.loadStrikes(expirationsToLoad);
  //   this.loadOptions(expirationsToLoad);
  // })
  //   }
  // }

  // ngAfterViewInit(): void {
  /**
   * First tab doesnt scroll without this
   */
  // this.scrollToStrikeMarker();
  // }

  reset(): void {
    // this.tabsLoaded.clear();
    // this.expirations.set([]);
    // this.strikeMap.clear();
  }

  async loadStrikes(expirations: Expiration[]): Promise<void> {
    if (expirations) {
      expirations.forEach(async (expiration: Expiration) => {
        // this.strikeMap.set(
        //   expiration,
        // this.tradier
        //   .getOptionStrikes(this.ticker, expiration)
        //   .then(async strikes => {
        //     let indexOfMidStrike = await this.checkForMarkerPlacement(expiration, strikes);
        //     return strikes.slice(Math.max(0, indexOfMidStrike - this.maxStrikesToShow / 2), indexOfMidStrike + this.maxStrikesToShow / 2);
        //   })
        // );
      });
    } else {
      console.warn("No expirations were able to be retrieved.");
    }
  }

  async checkForMarkerPlacement(expiration: Expiration, strikes: Strike[]) {
    // const underlying = this.underlying();
    // let indexOfMidStrike = strikes.length / 2;
    // strikes.forEach((s, i) => {
    //   if (strikes && strikes[i] && underlying && Number.parseFloat(<any>strikes[i]) < underlying) {
    //     if (strikes[i - 1] && Number.parseFloat(<any>strikes[i - 1]) > underlying) {

    //       this.markerIndex.set(expiration, strikes[i]);
    //       indexOfMidStrike = i;
    //       return;
    //     }
    //   }
    // });
    // return indexOfMidStrike;
  }

  async loadOptions(expirations: Expiration[]): Promise<void> {
    // expirations.forEach(async (expiration: Expiration) => {
    // this.tradier
    //   .getOptionChain(this.ticker, expiration)
    //   .then((options: Option[]) => {
    //     if (options && Array.isArray(options) && options.length > 0) {
    //       options?.forEach((option: Option) => {
    //         this.buildDeepMap(option, this.superNestedMap);
    //       });
    //     }
    //   });
    // });
  }

  checkIfAlreadyLoaded(expiration: Expiration) {
    return this.strikeMap.has(expiration);
  }

  tabChangeAnimitionDone() {
    // if (this.expirations) {

    //   const expirationsToLoad = this.expirations()
    //     .slice(
    //       Math.max(this.currentTab - this.preloadCount, 0),
    //       this.currentTab + this.preloadCount
    //     )
    //     .filter(eTL => this.checkIfAlreadyLoaded(eTL) == false);

    //   this.loadStrikes(expirationsToLoad);
    //   this.loadOptions(expirationsToLoad).then(() => {
    //     this.showStrikeMarker.set(true);
    //     this.scrollToStrikeMarker();
    //     this.showOptions.set(true);
    //   });
    // }
  }

  tabChange(expiration: Expiration) {
    // this.ASS.set("expiration", <string>expiration);
  }

  private scrollToStrikeMarker() {
    // if (this.strikeMarker?.toArray()[this.currentTab]) {
    //   this.strikeMarker
    //     .toArray()
    //   [this.currentTab]?.nativeElement.scrollIntoView({
    //     behavior: "smooth",
    //     block: "center",
    //     inline: "center"
    //   });
    // } else {
    //   setTimeout(() => {
    //     if (this.strikeMarker?.toArray()[this.currentTab]) {
    //       this.strikeMarker
    //         .toArray()
    //       [this.currentTab]?.nativeElement?.scrollIntoView({
    //         behavior: "smooth",
    //         block: "center",
    //         inline: "center"
    //       });
    //     }
    //   }, 1000)
    // }
  }

  private buildDeepMap(option: Option, deepMap: Map<Ticker, Map<OptionType, Map<Expiration, Map<Strike, Option>>>>) {
    // if (this.superNestedMap.has(this.ticker)) {
    //   if (this.superNestedMap.get(this.ticker).has(option.callOrPut)) {
    //     if (this.superNestedMap.get(this.ticker).get(option.callOrPut).has(option.expiry)) {
    //       if (this.superNestedMap.get(this.ticker).get(option.callOrPut).get(option.expiry).has(option.strike)) {
    //         console.warn("Duplicate option found in superNestedMap");
    //       } else {
    //         this.superNestedMap.get(this.ticker).get(option.callOrPut).get(option.expiry).set(option.strike, option);
    //       }
    //     } else {
    //       this.superNestedMap.get(this.ticker).get(option.callOrPut).set(option.expiry, new Map().set(option.strike, option));
    //     }
    //   } else {
    //     this.superNestedMap.get(this.ticker).set(option.callOrPut, new Map().set(option.expiry, new Map().set(option.strike, option)));
    //   }
    // }
    // else if (this.ticker) {
    //   deepMap.set(
    //     this.ticker,
    //     new Map().set(
    //       option.callOrPut,
    //       new Map().set(
    //         option.expiry,
    //         new Map().set(
    //           option.strike,
    //           option
    //         )
    //       )
    //     )
    //   );
    // }
  }

  toggle() {
    // this.showOptions.set(!this.showOptions())
  }
}
