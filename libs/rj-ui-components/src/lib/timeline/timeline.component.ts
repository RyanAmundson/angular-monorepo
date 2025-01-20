import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTimelineEvent, NgxTimelineModule } from '@frxjs/ngx-timeline';
import { MOCK_TIMELINE_EVENTS } from './models/mock/timeline-events.mock';

@Component({
  selector: 'rjui-timeline',
  standalone: true,
  imports: [CommonModule, NgxTimelineModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Input() events: NgxTimelineEvent[] = [];

  ngOnInit() {
    // Use mock data if no events are provided
    if (this.events.length === 0) {
      this.events = MOCK_TIMELINE_EVENTS;
    }
  }
} 