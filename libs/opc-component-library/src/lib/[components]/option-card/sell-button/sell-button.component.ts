import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'opc-sell-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sell-button.component.html',
  styleUrl: './sell-button.component.scss',
})
export class SellButtonComponent {

  count = input(0);
}
