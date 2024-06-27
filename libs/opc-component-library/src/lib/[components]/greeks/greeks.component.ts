import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'opc-greeks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './greeks.component.html',
  styleUrl: './greeks.component.scss',
})
export class GreeksComponent {
  @Input() greeks: { symbol: string, value: number }[] = [
    { symbol: 'Δ', value: 0.5 },  // Delta
    { symbol: 'Γ', value: 0.1 },  // Gamma
    { symbol: 'Θ', value: -0.2 }, // Theta
    { symbol: 'V', value: 0.3 },  // Vega
    { symbol: 'ρ', value: 0.05 }  // Rho
  ];

}
