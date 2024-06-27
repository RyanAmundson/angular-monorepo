import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'opc-buy-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buy-button.component.html',
  styleUrl: './buy-button.component.scss',
})
export class BuyButtonComponent {

  count = input(0);


}
