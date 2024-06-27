import { Component, computed, input, signal } from "@angular/core";
import { Option, OptionActions } from "../../[models]/models";
import {
  trigger,
  style,
  animate,
  transition,
  query,
} from "@angular/animations";
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { BorderRadiusLayoutDragComponent } from "../../[layouts]/border-radius-layout-drag/border-radius-layout-drag.component";
import { CdkDrag } from '@angular/cdk/drag-drop';
import { GreeksComponent } from "../greeks/greeks.component";
import { ActionsComponent } from "./actions/actions.component";
import { CardHeaderComponent } from "./card-header/card-header.component";
import { BuyButtonComponent } from "./buy-button/buy-button.component";
import { SellButtonComponent } from "./sell-button/sell-button.component";

@Component({
  selector: "opc-option-card",
  standalone: true,
  imports: [
    MatDialogModule, MatBadgeModule, ActionsComponent, CommonModule,
    CardHeaderComponent, MatCardModule, MatIconModule, BorderRadiusLayoutDragComponent,
    CdkDrag, GreeksComponent,
    BuyButtonComponent, SellButtonComponent
  ],
  templateUrl: "./option-card.component.html",
  styleUrls: ["./option-card.component.scss"],
  animations: [
    trigger("card", [
    ]),

    trigger("count", [
      transition(":increment", [
        query('.mat-badge-content', [
          animate(100, style({ 'transform': 'scale(1.2)' })),
        ])
      ]),
      transition(":decrement", [
        query('.mat-badge-content', [
          animate(100, style({ 'transform': 'scale(1.2)' })),
        ])
      ])
    ]),

    trigger("actionButtons", [
      transition(":enter", [
        style({ width: '0' }),
        animate(50, style({ width: '*' }))
      ]),
      transition(":leave", [
        style({ width: '*' }),
        animate(50, style({ width: 0 }))
      ])
    ]),
  ]
})
export class OptionCardComponent {
  OptionActions = OptionActions;
  disablePan = input(false);
  flipToPutSide = input(false);
  callOption = input<Option>();
  putOption = input<Option>();
  activeOption = computed<Option>(() => (this.flipToPutSide() ? this.putOption() : this.callOption()) as Option);
  count = computed(() => this.activeOption().count());

  volatility = computed(() => this.activeOption()?.greeks?.smv_vol);
  decay = computed(() => this.activeOption()?.greeks?.theta);

  sellingOrBuying = computed(() => {
    if (this.count && this.count() > 0) return OptionActions.Buy;
    else if (this.count && this.count() < 0) return OptionActions.Sell;
    return OptionActions.Neutral;
  });

  buy(option: Option, event?: MouseEvent): void {
    // console.debug(option)
    // event?.stopPropagation();
    // if (!this.count) {
    //   // this.count = this.selectedOptionsService.buyOption(option, signal(1));
    // } else {
    //   this.count.update((count: number) => count + 1);
    // }
  }

  sell(option: Option, event?: MouseEvent): void {
    // event?.stopPropagation();
    // if (!this.count) {
    //   // this.count = this.selectedOptionsService.sellOption(option, signal(-1));
    // } else {
    //   this.count.update((count: number) => count - 1);
    // }
  }

  /**
   * Add another buy or sell action
   * */
  add(option: Option, event?: MouseEvent) {
    // event?.stopPropagation();

    // if (this.sellingOrBuying() === OptionActions.Neutral) return;
    // if (this.sellingOrBuying() === OptionActions.Buy) this.count.update((count) => count + 1);
    // if (this.sellingOrBuying() === OptionActions.Sell) this.count.update((count) => count - 1);
  }

  remove(option: Option, event?: any) {
    // event?.stopPropagation();

    // if (this.sellingOrBuying() === OptionActions.Neutral) return;
    // if (this.sellingOrBuying() === OptionActions.Buy) this.count.update((count) => count - 1);
    // if (this.sellingOrBuying() === OptionActions.Sell) this.count.update((count) => count + 1);
  }

  reset(option: Option) {
    // this.count.set(0);
  }

}
