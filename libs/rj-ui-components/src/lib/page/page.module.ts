import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericPageComponent } from '../pages/generic-page/generic-page.component';
import { DocumentationModule } from '../containers/documentation/documentation.module';
import { ListsModule } from '../lists/lists.module';
import { LayoutsModule } from '../layouts/layouts.module';



@NgModule({
  imports: [
    CommonModule,
    // ListsModule,
    LayoutsModule
  ],
  declarations: [
    GenericPageComponent
  ],
  exports: [
    GenericPageComponent,
    // ListsModule
  ],
})
export class PageModule { }
