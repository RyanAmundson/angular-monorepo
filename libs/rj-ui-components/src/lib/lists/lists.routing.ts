import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ListsComponent } from './lists.component';


let routes: Route[] = [
  {
    path:'lists',
    component: ListsComponent
  },
  {
    path: '',
    redirectTo: 'lists',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'lists',
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class listsRoutingModule {
}
