import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, ElementRef, ViewChild, ViewContainerRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { Card3Component } from '../../cards/card3/card3.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'rjui-filter-card-holder',
  template: `<ng-content class='holder'></ng-content>`,
  styles: [``],
  standalone: true,
  imports: [CommonModule, FormsModule] 
})
export class FilterCardHolderComponent { }

@Component({
  selector: 'rjui-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, FilterCardHolderComponent],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class FilterBoxComponent implements AfterContentInit {
  private _cards: QueryList<ElementRef> | undefined;

  @ContentChildren(Card3Component, { read: ElementRef })
  get cards():QueryList<ElementRef> { return this._cards ?? new QueryList<ElementRef>(); }
  set cards(cards: QueryList<ElementRef> | undefined) {
    this._cards = cards;
    this.cardList = this.createCardList(cards);
  }

  @ViewChild('scrollContent', { read: ViewContainerRef, static: false }) scrollContainer!: ViewContainerRef;

  @Input() title = '';
  @Output() addNewCard = new EventEmitter<string>();

  addingCard = false;
  cardList: {type: any, context: unknown[][]} [] = [];
  component = FilterCardHolderComponent;
  showErrors = false;
  newCardComment = '';

  ngAfterContentInit() {
    // No need to check this.cards since the setter handles initialization
    this.cardList = this.createCardList(this._cards);
  }

  addButtonClick() {
    this.addCard();
  }

  filter() {
    // TODO: implement filter logic
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

  removeCard(index: number) {
    this.cardList.splice(index, 1);
  }

  createCardList(cards: QueryList<ElementRef> | undefined): any[] {
    if (cards) {
      return cards.toArray().map((card) => {
        return { type: FilterCardHolderComponent, context: [[card.nativeElement]] };
      });
    }
    return [];
  }
}
