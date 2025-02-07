import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from '@rjui';

@Component({
  selector: 'greed-timeline',
  standalone: true,
  imports: [CommonModule, TimelineComponent],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineContainerComponent {} 