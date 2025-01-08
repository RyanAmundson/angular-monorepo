import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables.component';
import { GradientTableComponent } from './gradient-table/gradient-table.component';
import { DocumentationModule } from '../containers/documentation/documentation.module';

@NgModule({
  imports: [
    CommonModule,
    DocumentationModule
  ],
  declarations: [
    TablesComponent,
    GradientTableComponent
  ]
})
export class TablesModule { }
