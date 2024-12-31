import { Component, OnInit,ViewChildren, QueryList } from '@angular/core';
import { Card1Component } from '../../cards/card1/card1.component';
import { DocumentationComponent } from '../../containers/documentation/documentation.component';

@Component({
  selector: 'tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.scss']
})
export class TablesPageComponent {
  @ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

  sectionList: string[] = [];
  constructor() {
  }

}
