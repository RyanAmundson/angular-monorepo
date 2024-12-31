import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentationComponent } from '../../containers/documentation/documentation.component';

@Component({
  selector: 'frames-page',
  templateUrl: './frames-page.component.html',
  styleUrls: ['./frames-page.component.scss']
})
export class FramesPageComponent {
  @ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

  sectionList: string[] = [
  ];

  constructor() {
  }

}
