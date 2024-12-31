import { Component, Directive, OnInit, Input, Output, EventEmitter, ContentChildren, QueryList, ElementRef, ContentChild, ViewChild, ViewChildren, ViewContainerRef, ViewRef, ComponentRef } from '@angular/core';
import { NgTemplateOutlet, JsonPipe } from '@angular/common';

import { Card3Component } from '../../cards/card3/card3.component';
import { ChangeDetectorRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  query,
  stagger,
  keyframes
} from '@angular/animations';
// import { Core,Custom } from '../../../assets/AngularAnimations';

@Component({
  selector: 'AA-filter-card-holder',
  template: `<ng-content class='holder'></ng-content>`,
  styles: [``]
})
export class FilterCardHolder { }



@Component({
  selector: 'AA-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss'],
  animations: [
    // Core.slideUp,
    // Core.fadeInUp,
    // Core.slideLeft,
    // Core.slideRight,
    // Core.expandCircle,
    // Core.slideFade,
    // Core.blink,
    // Core.pulse,
    // Core.rubberBand,
    // Core.listFadeIn,
    // Core.flyInOut,
    // Core.pieceTogether,
    // Core.listItemFromTemplate,
    // Custom.slide('0%','100vh',5000, 'upBy100')
  ]
})
export class FilterBoxComponent implements OnInit {
  _cards;
  @ContentChildren(Card3Component, { read: ElementRef })
  get cards() { return this._cards; }
  set cards(cards) { cards ? this.cardList = this.createCardList(cards) : console.log("no cards"); }
  @ViewChild('scrollContent', { read: ViewContainerRef, static: false }) scrollContainer: ViewContainerRef;

  @Input() title: string = '';
  @Output() addNewCard: EventEmitter<string> = new EventEmitter();

  addingCard: boolean;
  cardList: any[];
  component = FilterCardHolder;
  showErrors = false;
  newCardComment: string = '';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngAfterContentInit() {
    if (this.cards)
      this.cardList = this.createCardList(this.cards);
  }

  addButtonClick() {
    this.addCard();
  }

  filter() {
    //TODO: implement
  }

  saveCard(text: string) {
    if (text) {
      this.addNewCard.emit(text);
      this.addingCard = false;
      this.newCardComment = '';
      this.showErrors = false;
    } else {
      this.showErrors = true;
    }
  }
  cancelNewCard() {
    this.addingCard = false;
    this.showErrors = false;
  }

  addCard() {
    this.addingCard = true;
    this.scrollContainer.element.nativeElement.scrollTo(0, 0);
  }

  removeCard(index) {
    this.cardList.splice(index, 1);
  }



  createCardList(cards): any[] {
    if (cards)
      return cards.toArray().map((card) => {
        return { type: FilterCardHolder, context: [[card.nativeElement]] };
      })
  }

}
