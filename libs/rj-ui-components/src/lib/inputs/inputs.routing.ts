import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { InputsComponent } from './inputs.component';


let routes: Route[] = [
  {
    path:'inputs',
    component: InputsComponent
  },
  {
    path: '',
    redirectTo: 'inputs',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'inputs',
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
export class InputsRoutingModule {
}
