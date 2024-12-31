import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rjui-card-2',
  templateUrl: './card2.component.html',
  styleUrls: ['./card2.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class Card2Component {

  @Input() color = "green";
  @Input() data = "72%";
  @Input() label = "Email Open Rate";


              
}
