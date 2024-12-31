import { Component, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'rjui-card-3',
  templateUrl: './card3.component.html',
  styleUrls: ['./card3.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class Card3Component {

  color = '';

  @Input() icon = "phone";
  @Input() title = "title";
  @Input() date = new Date().toLocaleDateString();
  @Input() time = new Date().toLocaleTimeString();
  @Input() bodyText = 'body text';

  editing = false;

}
