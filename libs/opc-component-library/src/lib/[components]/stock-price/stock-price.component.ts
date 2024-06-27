import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'opc-stock-price',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-price.component.html',
  styleUrls: ['./stock-price.component.scss']
})
export class StockPriceComponent implements OnChanges {
  @Input() price = 0;

  currentPriceArray: (string | number)[] = [];
  digits: (number | string)[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.', ','];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['price']) {
      this.updatePriceArray(changes['price'].currentValue);
    }
  }

  private updatePriceArray(price: number) {
    this.currentPriceArray = this.formatPrice(price).split('').map(digit => digit === '.' || digit === ',' ? digit : +digit);
  }

  private formatPrice(price: number): string {
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
