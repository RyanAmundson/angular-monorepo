import { Component, OnInit,ViewChildren, QueryList } from '@angular/core';
import { DocumentationComponent } from '../containers/documentation/documentation.component';

@Component({
  selector: 'uic-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent {
@ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

sectionList:string[] = [];
  constructor( ) {
  }

}
