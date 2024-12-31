import { Component, OnInit,ViewChildren, QueryList } from '@angular/core';
import { DocumentationComponent } from '../../containers/documentation/documentation.component';

@Component({
  selector: 'notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent {
  @ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();


  sectionList: string[] = [];
  constructor() {
  }

}
