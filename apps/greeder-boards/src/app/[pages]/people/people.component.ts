import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

interface Person {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  connections: number;
  interests: string[];
}

@Component({
  selector: 'greed-people',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleComponent {
  people: Person[] = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Software Engineer',
      imageUrl: 'assets/images/people/person1.jpg',
      connections: 156,
      interests: ['Technology', 'AI', 'Web Development']
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'UX Designer',
      imageUrl: 'assets/images/people/person2.jpg',
      connections: 243,
      interests: ['Design', 'User Experience', 'Art']
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Product Manager',
      imageUrl: 'assets/images/people/person3.jpg',
      connections: 189,
      interests: ['Product Strategy', 'Innovation', 'Leadership']
    }
  ];
} 