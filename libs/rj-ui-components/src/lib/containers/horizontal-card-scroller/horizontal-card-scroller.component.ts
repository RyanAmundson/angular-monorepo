import { Component, Input, ContentChildren, QueryList, ElementRef, Output, EventEmitter, AfterContentInit, ChangeDetectorRef, ViewChildren, AfterViewInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
// import { Core, Custom } from '../../../assets/AngularAnimations';

@Component({
  selector: 'rjui-card-holder',
  template: `<ng-content class='holder'></ng-content>`,
  standalone: true,
  imports: [CommonModule],
})
export class CardHolderComponent { }

export interface BaseCard {//must have id value
  id: number | string;
}

export class ScrollerCard<T extends BaseCard> {

  id: number | string;
  get view() { return this.card.nativeElement || this.card.elRef.nativeElement || null };
  elRef!: ElementRef;
  index: number;
  card: any;
  status: "unchanged" | "moved" | "updated" | "added" | "deleted" = "unchanged";
  selected = false;
  constructor(card: T, index: number, status: "unchanged" | "moved" | "updated" | "added" | "deleted" = "unchanged") {
    const generatedId = this.idGenerator().next().value as number;
    this.id = card.id || generatedId;
    this.card = card;
    this.index = index;
    this.status = status;
  }

  *idGenerator() {
    const id = 0;
    while (true)
      yield <number>Math.random() * 100000 / 1;
  }
}

@Component({
  selector: 'rjui-horizontal-card-scroller',
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
  ],
  standalone: true,
  imports: [CommonModule],
})

export class HorizontalCardScrollerComponent implements AfterContentInit, AfterViewInit {
  @ViewChildren("scrollContent", { read: ElementRef }) scrollContainer: QueryList<ElementRef> | undefined;
  @ContentChildren('cardListItem') cards: QueryList<ElementRef & ScrollerCard<BaseCard>> | undefined;//raw

  @Input() maxSelectable = 0;
  @Input() fixedWidth = 180;
  @Input() maxCards = 0;
  @Input() centered = false;

  @Output() cardSelected: EventEmitter<any> = new EventEmitter();
  @Output() cardDeselected: EventEmitter<any> = new EventEmitter();

  cardMap!: Array<ScrollerCard<BaseCard>>;//formatted
  cardHolder: typeof CardHolderComponent = CardHolderComponent;
  numVisibleCardsAtAnyGivenTime!: number;

  itemWidth!: number;
  itemWidths: number[] = [];

  widthOfContainer!: number;
  widthOfContent!: number;
  scrollOffset!: number;

  canScrollRight = false;
  canScrollLeft = false;


  constructor(private ref: ChangeDetectorRef) { }


  ngAfterContentInit() {
    this.update();
    this.cards?.changes.subscribe(() => this.update());//update card state as the get added or removed
  }

  ngAfterViewInit() {
    this.updateScrollContainer();
    this.scrollContainer?.changes.subscribe(() => {
      this.updateScrollContainer();
    });
  }

  update() {
    if (!this.cardMap) this.cardMap = [];

    let i = 0;
    while (i < this.cardMap.length) {//need to manage index due to in place manipulation
      if (!this.checkRemoved(this.cardMap[i], i)) {
        i++; //increment if not deleted
      }
    }
    this.cards?.toArray().forEach((c, idx) => {
      this.getStatus(c, idx);
    })
    this.cardMap = this.cardMap.slice(0, this.cards?.length)//remove leftovers
  }

  checkRemoved(card: ScrollerCard<BaseCard>, idx: number): boolean {
    let removed = false;
    const matchIndex = this.cards?.toArray().findIndex((c) => (c.id) == card.id);

    if (matchIndex == -1) {
      removed = true;
      this.cardMap.splice(idx, 1);
    }
    else if (idx != matchIndex && matchIndex !== undefined) {
      this.cardMap[idx].status = "moved";
      this.cardMap[idx].index = matchIndex;
    }

    return removed;
  }

  getStatus(card: BaseCard, index: number) {
    const matchIndex = this.cardMap.findIndex((x) => { return card.id == x.id });

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
        this.scrollContainer?.first?.nativeElement?.scrollBy({
          left: -this.itemWidth,
          behavior: 'smooth'
        });
        break;
      case 'right':
        this.scrollContainer?.first?.nativeElement?.scrollBy({
          left: this.itemWidth,
          behavior: 'smooth'
        });
        break;
    }
    this.updateScrollContainer();
  }

  private updateScrollContainer(){
    //timeout until animation finishes
    setTimeout(() => {
      this.widthOfContainer = this.scrollContainer?.first?.nativeElement?.offsetWidth || this.scrollContainer?.first?.nativeElement?.clientWidth;
      this.widthOfContent = this.scrollContainer?.first?.nativeElement?.scrollWidth ?? 0;
      this.scrollOffset = this.scrollContainer?.first?.nativeElement?.scrollLeft ?? 0;
      this.itemWidth = this.cards?.length ? (this.widthOfContent / this.cards.length) : 0;
    }, 1500);
  }
}