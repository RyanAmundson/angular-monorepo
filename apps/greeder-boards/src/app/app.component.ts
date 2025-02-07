import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

interface NavItem {
  path: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'greed-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navItems: NavItem[] = [
    { path: '/feed', title: 'Feed', icon: 'rss_feed' },
    { path: '/events', title: 'Events', icon: 'event' },
    { path: '/people', title: 'People', icon: 'people' },
    { path: '/categories', title: 'Categories', icon: 'category' },
    { path: '/timeline', title: 'Timeline', icon: 'timeline' },
    { path: '/profile', title: 'Profile', icon: 'person' }
  ];

  getCurrentPageTitle(): string {
    const currentPath = window.location.pathname.split('/')[1] || 'feed';
    const navItem = this.navItems.find(item => item.path.includes(currentPath));
    return navItem ? navItem.title : 'Greeder Boards';
  }
}
