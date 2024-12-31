import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'rjui-recent-lead',
  templateUrl: './recent-lead.component.html',
  styleUrls: ['./recent-lead.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class RecentLeadCardComponent {
  createdDt: Date = new Date();

  @Input() lob = 'lob';
  @Input() name = 'name';
  @Input() source = 'source';
  @Input() date: Date = new Date();
}
