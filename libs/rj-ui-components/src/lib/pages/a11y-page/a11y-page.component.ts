import { Component, OnInit,ViewChildren, QueryList } from '@angular/core';
import { DocumentationComponent } from '../../containers/documentation/documentation.component';

@Component({
  selector: 'a11y-page',
  templateUrl: './a11y-page.component.html',
  styleUrls: ['./a11y-page.component.scss']
})
export class A11yPageComponent {
@ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

  constructor( ) {
  }

}
