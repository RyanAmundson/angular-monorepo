import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DocumentationComponent } from './documentation/documentation.component';
// import { MockDataService } from '../data-generation/mockdata.service';
// import { FilterCard } from '@models/models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'rjui-container-page',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss'],
  standalone: true,
  imports: [CommonModule, DocumentationComponent, HorizontalScrollerComponent, FilterBoxComponent, GenericPanelComponent],
})
export class ContainersComponent {


  @ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

  sectionList:string[] = [
    "Documentation Container",
    "Horizontal Scroller",
    "Filter Box",
    "Generic Panel"
  ];
  cards = [];
  filterCards = [];




  addTimelineCard() {
    // this.mockData.filterCards.unshift(new FilterCard("title", "text"));
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
