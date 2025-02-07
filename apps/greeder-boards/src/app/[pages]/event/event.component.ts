import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../[services]/event.service';

@Component({
  selector: 'greed-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {

  eventsService = inject(EventService);

  ngOnInit() {
    this.eventsService.getEvents().subscribe((events) => {
      console.log(events);
    });
  }
} 