import { Component, OnInit,ViewChildren, QueryList } from '@angular/core';
import { DocumentationComponent } from '../../containers/documentation/documentation.component';

@Component({
  selector: 'motion-page',
  templateUrl: './motion-page.component.html',
  styleUrls: ['./motion-page.component.scss']
})
export class MotionPageComponent {
  @ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();


  sectionList: string[] = [];
  constructor() {
  }

}
