import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

interface Event {
  id: number;
  title: string;
  date: Date;
  location: string;
  description: string;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'greed-events',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  events: Event[] = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: new Date('2024-06-15'),
      location: 'San Francisco, CA',
      description: 'Annual technology conference featuring the latest innovations',
      category: 'Technology',
      imageUrl: 'assets/images/events/tech-conf.jpg'
    },
    {
      id: 2,
      title: 'Summer Music Festival',
      date: new Date('2024-07-20'),
      location: 'Austin, TX',
      description: 'Three days of live music performances',
      category: 'Music',
      imageUrl: 'assets/images/events/music-fest.jpg'
    },
    {
      id: 3,
      title: 'Food & Wine Expo',
      date: new Date('2024-08-10'),
      location: 'New York, NY',
      description: 'Culinary showcase featuring top chefs and wineries',
      category: 'Food & Drink',
      imageUrl: 'assets/images/events/food-expo.jpg'
    }
  ];
} 