import { Component, Signal, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallOrPut } from '../../../[models]/models';

@Component({
  selector: 'opc-card-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.scss',
})
export class CardHeaderComponent {

  strike = input<number>(0);
  callOrPut = input<CallOrPut | null>(null);
  bid = input(0);
  ask = input(0);
  openInterest = input(0);

  mid = computed(() => (this.bid() + this.ask()) / 2);

}
