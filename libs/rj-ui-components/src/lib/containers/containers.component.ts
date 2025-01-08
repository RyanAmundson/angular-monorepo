import { Component, ViewChildren, QueryList } from '@angular/core';
import { DocumentationComponent } from './documentation/documentation.component';
import { CommonModule } from '@angular/common';
import { HorizontalCardScrollerComponent } from './horizontal-card-scroller/horizontal-card-scroller.component';
import { GenericPageComponent } from '../page/generic-page.component';
import { ContactDetailPanelFlyoutComponent } from './contact-detail-panel/contact-detail-panel-flyout/contact-detail-panel-flyout.component';
import { ContactDetailPanelComponent } from './contact-detail-panel/contact-detail-panel.component';
import { Card1Component } from '../cards/card1/card1.component';
import { Card2Component } from '../cards/card2/card2.component';
import { Card3Component } from '../cards/card3/card3.component';
import { FilterBoxComponent } from './filter-box/filter-box.component';
import { LoadingIconComponent } from '../placeholders/loading-icon/loading-icon.component';
import { NoResultsComponent } from '../placeholders/no-results/no-results.component';

@Component({
  selector: 'rjui-container-page',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DocumentationComponent,
    HorizontalCardScrollerComponent,
    GenericPageComponent,
    ContactDetailPanelComponent,
    ContactDetailPanelFlyoutComponent,
    Card3Component,
    FilterBoxComponent,
    Card1Component,
    LoadingIconComponent,
    NoResultsComponent,
    Card2Component,
  ],
})
export class ContainersComponent {
  @ViewChildren(DocumentationComponent)
  sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

  sectionList: string[] = [
    'Documentation Container',
    'Horizontal Scroller',
    'Filter Box',
    'Generic Panel',
  ];
  cards: any[] = [];
  filterCards: any[] = [];

  addTimelineCard(event: string) {
    // Implement logic to add a timeline card
  }

  addCard(index?: number) {
    // Implement logic to add a card
  }

  changeCardSet(set: number) {
    // Implement logic to change card set
  }

  removeCard(index?: number, deleteCount?: number) {
    // Implement logic to remove a card
  }
}
