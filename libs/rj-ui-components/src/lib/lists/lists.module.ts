import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToListComponent } from './scroll-to-list/scroll-to-list.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { MatListModule } from '@angular/material';
import { BlueUnderlineTabsComponent } from './blue-underline-tabs/blue-underline-tabs.component';
import { ListsComponent } from './lists.component';
import { listsRoutingModule } from './lists.routing';
import { DocumentationModule } from '../containers/documentation/documentation.module';
import { PageModule } from '../page/page.module';


@NgModule({
  imports: [
    CommonModule,
    ScrollToModule,
    MatListModule,
    listsRoutingModule,
    DocumentationModule,
    PageModule
  ],
  declarations: [
    ListsComponent,
    ScrollToListComponent,
    BlueUnderlineTabsComponent
  ],
  exports:[
    ScrollToListComponent,
    BlueUnderlineTabsComponent
  ]
})
export class ListsModule { }
