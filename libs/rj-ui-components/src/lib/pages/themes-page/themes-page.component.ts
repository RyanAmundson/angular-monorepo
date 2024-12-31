import { Component, OnInit,ViewChildren, QueryList } from '@angular/core';
import { Card1Component } from '../../cards/card1/card1.component';
import { DocumentationComponent } from '../../containers/documentation/documentation.component';

@Component({
  selector: 'themes-page',
  templateUrl: './themes-page.component.html',
  styleUrls: ['./themes-page.component.scss']
})
export class ThemesPageComponent {
  @ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

  sectionList: string[] = [
    "Global Styling",
    "Scoped Styling",
    "Third Party Styling",
    "First Party Styling"
  ];

  constructor() {
  }

}
