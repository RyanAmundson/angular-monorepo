import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Card1Component } from '../../cards/card1/card1.component';
import { DocumentationComponent } from '../../containers/documentation/documentation.component';

@Component({
  selector: 'typography-page',
  templateUrl: './typography-page.component.html',
  styleUrls: ['./typography-page.component.scss']
})
export class TypographyPageComponent {
  @ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

  constructor() {
  }

}
