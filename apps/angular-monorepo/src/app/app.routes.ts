import { Route } from '@angular/router';
import { ButtonsComponent, UnderConstructionComponent } from '@rjui';
import { HomePageComponent } from '@rjui';
import { CardPageComponent } from '@rjui';

export const appRoutes: Route[] = [
    {
      path: 'home',
      component: HomePageComponent,
      data: { title: 'Home' }
    },
    {
      path: 'cards',
      component: CardPageComponent,
      data: { title: 'Cards' }
    },
    {
      path: 'themes',
      component: UnderConstructionComponent,
      data: { title: 'Themes' }
    },
    {
      path: 'buttons',
      component: ButtonsComponent,
      data: { title: 'Buttons' }
    },
    {
      path: 'containers',
      component: ContainersComponent,
      data: { title: 'Containers' }
    },
    {
      path: 'layouts',
      component: UnderConstructionComponent,
      data: { title: 'Layouts' }
    },
    {
      path: 'modals',
      component: UnderConstructionComponent,
      data: { title: 'Modals' }
    },
    {
      path: 'typography',
      component: UnderConstructionComponent,
      data: { title: 'Typography' }
    },
    {
      path: 'tables',
      component: UnderConstructionComponent,
      data: { title: 'Tables' }
    },
    {
      path: 'lists',
      component: UnderConstructionComponent,
      data: { title: 'Lists' }
    },
    {
      path: 'inputs',
      component: UnderConstructionComponent,
      data: { title: 'Inputs' }
    },
    {
      path: 'placeholders',
      component: UnderConstructionComponent,
      data: { title: 'Placeholders' }
    },
    {
      path: 'motion',
      component: UnderConstructionComponent,
      data: { title: 'Motion' }
    },
    {
      path: 'notifications',
      component: UnderConstructionComponent,
      data: { title: 'Notifications' }
    },
    {
      path: 'resources',
      component: UnderConstructionComponent,
      data: { title: 'Resources' }
    },
    {
      path: 'dialogs',
      component: UnderConstructionComponent,
      data: { title: 'Dialogs' }
    },
    {
      path: 'chips',
      component: UnderConstructionComponent,
      data: { title: 'Chips' }
    },
    {
      path: 'a11y',
      component: UnderConstructionComponent,
      data: { title: 'Accessibility' }
    },
    {
      path: 'i18n',
      component: UnderConstructionComponent,
      data: { title: 'Internationalization' }
    },
    {
      path: 'frames',
      component: UnderConstructionComponent,
      data: { title: 'Frames' }
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: 'home',
      pathMatch: 'full'
    },
];