import { Component, ViewChildren, QueryList } from '@angular/core';
import { DocumentationComponent } from '../containers/documentation/documentation.component';
import { Card2Component } from './card2/card2.component';
import { Card3Component } from './card3/card3.component';
import { Card1Component } from './card1/card1.component';
import { GenericPageComponent } from '../pages/generic-page/generic-page.component';
import { RecentLeadCardComponent } from './recent-lead/recent-lead.component';
@Component({
  selector: 'rjui-card-page',
  standalone: true,
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  imports: [GenericPageComponent, DocumentationComponent, Card1Component, Card2Component, Card3Component, RecentLeadCardComponent], 
})
export class CardPageComponent {
  @ViewChildren(DocumentationComponent)
  sections: QueryList<DocumentationComponent> =
    new QueryList<DocumentationComponent>();

  sectionList: string[] = ['card 1', 'card 2', 'card 3', 'recent lead'];


}
