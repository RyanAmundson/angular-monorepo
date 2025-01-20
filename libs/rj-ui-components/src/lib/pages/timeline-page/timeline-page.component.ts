import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from '../../timeline/timeline.component';
import { GenericPageComponent } from '../generic-page/generic-page.component';
import { DocumentationComponent } from '../../containers/documentation/documentation.component';
import { MOCK_TIMELINE_EVENTS } from '../../timeline/models/mock/timeline-events.mock';
import { NgxTimelineEvent } from '@frxjs/ngx-timeline';

@Component({
  selector: 'rjui-timeline-page',
  standalone: true,
  imports: [CommonModule, TimelineComponent, GenericPageComponent, DocumentationComponent],
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss']
})
export class TimelinePageComponent {
    timelineEvents: NgxTimelineEvent[] = MOCK_TIMELINE_EVENTS;
} 