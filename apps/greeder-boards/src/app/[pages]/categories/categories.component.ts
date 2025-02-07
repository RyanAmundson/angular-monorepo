import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Category {
  id: number;
  name: string;
  eventCount: number;
  imageUrl: string;
}

@Component({
  selector: 'greed-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: Category[] = [
    {
      id: 1,
      name: 'Sports',
      eventCount: 42,
      imageUrl: 'assets/images/categories/sports.jpg'
    },
    {
      id: 2,
      name: 'Music',
      eventCount: 56,
      imageUrl: 'assets/images/categories/music.jpg'
    },
    {
      id: 3,
      name: 'Technology',
      eventCount: 38,
      imageUrl: 'assets/images/categories/technology.jpg'
    },
    {
      id: 4,
      name: 'Food & Drink',
      eventCount: 29,
      imageUrl: 'assets/images/categories/food.jpg'
    },
    {
      id: 5,
      name: 'Arts & Culture',
      eventCount: 45,
      imageUrl: 'assets/images/categories/arts.jpg'
    }
  ];
} 