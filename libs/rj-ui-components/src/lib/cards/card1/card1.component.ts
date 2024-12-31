import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rjui-card-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card1.component.html',
  styleUrls: ['./card1.component.scss']
})
export class Card1Component {
  @Input() icon = "bell-o";
  @Input() color = "gray";
  @Input() title = "title";
  @Input() type = "Type";
  @Input() active = false;
}
