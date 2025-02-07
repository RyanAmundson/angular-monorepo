import { Route } from '@angular/router';
import { FeedComponent } from './[pages]/feed/feed.component';
import { ProfileComponent } from './[pages]/profile/profile.component';
import { EventComponent } from './[pages]/event/event.component';
import { TimelineContainerComponent } from './[pages]/timeline/timeline.component';
import { CategoriesComponent } from './[pages]/categories/categories.component';
import { EventsComponent } from './[pages]/events/events.component';
import { PeopleComponent } from './[pages]/people/people.component';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
    {
        path: 'feed',
        component: FeedComponent,
        title: 'Feed'
    },
    {
        path: 'events',
        component: EventsComponent,
        title: 'Events'
    },
    {
        path: 'people',
        component: PeopleComponent,
        title: 'People'
    },
    {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile'
    },
    {
        path: 'event',
        component: EventComponent,
        title: 'Event'
    },
    {
        path: 'timeline',
        component: TimelineContainerComponent,
        title: 'Timeline'
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories'
    },
    {
        path: '**',
        redirectTo: 'feed'
    }
];
