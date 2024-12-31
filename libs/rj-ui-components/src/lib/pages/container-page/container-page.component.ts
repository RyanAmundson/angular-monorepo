import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DocumentationComponent } from '../../containers/documentation/documentation.component';
import { MockDataService } from '../../data-generation/mockdata.service';
import { FilterCard } from '@models/models';


@Component({
  selector: 'app-container-page',
  templateUrl: './container-page.component.html',
  styleUrls: ['./container-page.component.scss']
})
export class ContainerPageComponent {


  @ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

  sectionList:string[] = [
    "Documentation Container",
    "Horizontal Scroller",
    "Filter Box",
    "Generic Panel"
  ];
  cards;
  filterCards = [];

  constructor(private mockData: MockDataService) {
    this.cards = mockData.cardset1;
  }


  addTimelineCard(bodyText) {
    this.mockData.filterCards.unshift(new FilterCard("title", "text"));
  }


  addCard(index?) {
    if (!index) {
      this.cards.unshift(this.mockData.cardMaker());
    } else {
      this.cards.splice(index, 0, this.mockData.cardMaker());
    }
  }

  changeCardSet(set) {
    switch (set) {
      case 1:
        this.cards = this.mockData.cardset1;
        break;
      case 2:
        this.cards = this.mockData.cardset2;
        break;
      case 3:
        this.cards = this.mockData.cardset3;
        break;

    }
  }
  removeCard(index?, deleteCount?) {
    if (!index) {
      this.cards.shift();
    } else {
      if (!deleteCount) deleteCount = 1;
      this.cards.splice(index, deleteCount);
    }

  }

}
