import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'opc-actions',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
})
export class ActionsComponent {
  add = output();
  remove = output();
  reset = output();
}
