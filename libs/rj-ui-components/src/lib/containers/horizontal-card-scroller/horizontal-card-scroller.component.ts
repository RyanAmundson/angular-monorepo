import { Component, Input, ContentChildren, QueryList, ElementRef, TemplateRef, ViewChild, Output, EventEmitter, AfterContentInit, ChangeDetectorRef, ContentChild, ViewChildren } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
// import { Core, Custom } from '../../../assets/AngularAnimations';

@Component({
  selector: 'AA-card-holder',
  template: `<ng-content class='holder'></ng-content>`,
})
export class CardHolder { }

export interface BaseCard {//must have id value
  id: number | string;
}

export class ScrollerCard<T extends BaseCard> {

  id: number | string;
  get view() { return this.card.nativeElement || this.card.elRef.nativeElement || null };
  elRef: ElementRef;
  index: number;
  card: any;
  status: "unchanged" | "moved" | "updated" | "added" | "deleted" = "unchanged";
  selected: boolean = false;
  constructor(card: T, index: number, status: "unchanged" | "moved" | "updated" | "added" | "deleted" = "unchanged") {
    this.id = card.id || this.idGenerator().next().value;
    this.card = card;
    this.index = index;
    this.status = status;
  }

  *idGenerator() {
    let id = 0;
    while (true)
      yield <number>Math.random() * 100000 / 1;
  }
}

@Component({
  selector: 'AA-horizontal-card-scroller',
  templateUrl: './horizontal-card-scroller.component.html',
  styleUrls: ['./horizontal-card-scroller.component.scss'],
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
    // Core.flyInOut,
    // Core.cardFlipIn,
    // Core.cardFlipOut,
    // Custom.slide('0%', '100vh', 5000, 'upBy100'),
    trigger('cardFlipIn', [
      transition(':leave', [
        style({ width: '*', opacity: 1 }),
        style({ transform: 'rotateY( 0deg )', 'transform-style': 'preserve-3d', 'transition': 'transform 1s' }),
        animate('0.5s ease', style({ transform: 'rotateY( 180deg )', 'transform-style': 'preserve-3d', 'transition': 'transform 1s', opacity: '0' })),
        animate('0.5s ease', style({ width: "0", margin: "0", padding: "0", border: "0" })),
      ]),
      // transition('* => deleted', [
      //     style({ width: '*' }),
      //     animate('0.5s ease', style({ width: 0 })),
      // ]),
      transition('unchanged => added,void => added, deleted => added', [
        style({ opacity: 0, width: '0px' }),
        style({ transform: 'rotateY( 180deg )', 'transform-style': 'preserve-3d', 'transition': 'transform 1s' }),
        animate('0.3s ease', style({ width: "*" })),
        animate('0.3s ease', style({ transform: 'rotateY( 0deg )', 'transform-style': 'preserve-3d', 'transition': 'transform 1s', opacity: '1' })),
      ]),

    ])
  ]
})

export class HorizontalCardScrollerComponent implements AfterContentInit {
  @ViewChildren("scrollContent", { read: ElementRef }) scrollContainer: QueryList<ElementRef>;
  @ContentChildren('cardListItem') cards: QueryList<ElementRef & ScrollerCard<BaseCard>>;//raw

  @Input() maxSelectable: number = 0;
  @Input() fixedWidth: number = 180;
  @Input() maxCards: number = 0;
  @Input() centered: boolean = false;

  @Output() cardSelected: EventEmitter<any> = new EventEmitter();
  @Output() cardDeselected: EventEmitter<any> = new EventEmitter();

  cardMap: Array<ScrollerCard<BaseCard>>;//formatted
  cardHolder: typeof CardHolder = CardHolder;
  numVisibleCardsAtAnyGivenTime: number;

  itemWidth: number;
  itemWidths: number[] = [];

  widthOfContainer: number;
  widthOfContent: number;
  scrollOffset: number;

  canScrollRight: boolean;
  canScrollLeft: boolean;


  constructor(private ref: ChangeDetectorRef) { }


  ngAfterContentInit() {
    this.update(this.cards);
    this.cards.changes.subscribe((changes) => this.update(changes));//update card state as the get added or removed
  }

  ngAfterContentChecked() {

  }

  ngAfterViewInit() {
    this.updateScrollContainer();
    this.scrollContainer.changes.subscribe((changes) => {
      this.updateScrollContainer();
    })
  }

  update(changes) {
    if (!this.cardMap) this.cardMap = new Array();

    var i = 0;
    while (i < this.cardMap.length) {//need to manage index due to in place manipulation
      if (!this.checkRemoved(this.cardMap[i], i)) {
        i++; //increment if not deleted
      }
    }
    this.cards.toArray().forEach((c, idx) => {
      this.getStatus(c, idx);
    })
    this.cardMap = this.cardMap.slice(0, this.cards.length)//remove leftovers
  }

  checkRemoved(card: ScrollerCard<BaseCard>, idx: number): boolean {
    let removed = false;
    let matchIndex = this.cards.toArray().findIndex((c) => (c.id) == card.id);

    if (matchIndex == -1) {
      removed = true;
      this.cardMap.splice(idx, 1);
    }
    else if (idx != matchIndex) {
      this.cardMap[idx].status = "moved";
      this.cardMap[idx].index = matchIndex;
    }

    return removed;
  }

  getStatus(card: BaseCard, index: number) {
    let matchIndex = this.cardMap.findIndex((x) => { return card.id == x.id });

    if (matchIndex == -1) {
      this.cardMap.splice(index, 0, new ScrollerCard(card, index, "added"));

    } else if (matchIndex != index) {
      this.cardMap[index].status = "moved";
      this.cardMap[index].index = index;
      this.cardMap[index].card = card;

    } else if (matchIndex == index) {
      this.cardMap[index].card = card;
      this.cardMap[index].status = "unchanged";
    }
  }

  cardClicked(card: ScrollerCard<BaseCard>) {
    card.selected = !card.selected
    if (card.selected) {
      this.cardSelected.emit(card.card);
    } else {
      this.cardDeselected.emit(card.card);
    }
  }

  scroll(event: Event, direction: string) {
    //scroll horizontally with vertical scroll
    switch (direction) {
      case 'left':
        this.scrollContainer.first.nativeElement.scrollBy({
          left: -this.itemWidth,
          behavior: 'smooth'
        });
        break;
      case 'right':
        this.scrollContainer.first.nativeElement.scrollBy({
          left: this.itemWidth,
          behavior: 'smooth'
        });
        break;
    }
    this.updateScrollContainer();
  }

  private updateScrollContainer(){
    //timeout until animation finishes
    setTimeout(_ => {
      this.widthOfContainer = this.scrollContainer.first.nativeElement.offsetWidth || this.scrollContainer.first.nativeElement.clientWidth;
      this.widthOfContent = this.scrollContainer.first.nativeElement.scrollWidth;
      this.scrollOffset = this.scrollContainer.first.nativeElement.scrollLeft;
      this.itemWidth = this.widthOfContent / this.cards.length;
    }, 1500);
  }
}