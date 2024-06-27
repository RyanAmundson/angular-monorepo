import { ChangeDetectionStrategy, Component, Input, ViewChild, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { Observable, fromEvent, map, of, pairwise, startWith, takeUntil } from 'rxjs';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import 'hammerjs';

export class MyHammerConfig extends HammerGestureConfig {
  override overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
    pan: { threshold: 10 }  // Configuring the pan gesture
  };
}

@Component({
  selector: 'opc-border-radius-layout-drag',
  standalone: true,
  imports: [CommonModule, CdkDrag, HammerModule],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  templateUrl: './border-radius-layout-drag.component.html',
  styleUrl: './border-radius-layout-drag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BorderRadiusLayoutDragComponent {
  disablePan = input(false);
  @Input() isComponentLayout = false;
  @Input() edgeColor = 'orange';
  @Input() maxEdgeSize = 100;

  containerRect?: DOMRect;
  @ViewChild('draggable', { static: false }) draggable?: any;
  @ViewChild('container', { static: false, }) container?: any;

  private currentTranslate: { x: number, y: number } = { x: 0, y: 0 };

  ngAfterViewInit() {
    if (this.disablePan()) return;
    if (!this.draggable) return;
    const element = this.draggable?.nativeElement;

    // Initialize Hammer.js on the element
    const hammer = new Hammer(element);

    // hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    hammer.on('panstart', (event) => this.onPanStart(event));
    hammer.on('panmove', (event) => this.onPanMove(event));
    hammer.on('panend', (event) => this.onPanEnd(event));
    if (this.container && this.container.nativeElement) {
      this.containerRect = this.container?.nativeElement.getBoundingClientRect();
    }

  }

  onPanStart(event: any, style = 'slide') {
    this.slideStart(event);
  }

  onPanMove(event: any, style = 'slide') {
    if (style === 'slide') {
      console.log("panMove")
    }
  }

  onPanEnd(event: any, style = 'slide') {
    if (style === 'slide') {
      console.log("panEnd")
    }
  }

  slideStart(event: any) {
    const direction = event.additionalEvent;

    if (direction === 'panleft') { // left 
      if (this.edgesVisible().right == 0 && this.edgesVisible().left !== 0) {
        this.hideLeftEdge();
        this.hideRightEdge();
      } else {
        this.showRightEdge();
        this.hideLeftEdge();
      }
    }

    if (direction === 'panup') { // up
      if (this.edgesVisible().bottom == 0 && this.edgesVisible().top !== 0) {
        this.hideTopEdge();
        this.hideBottomEdge();
      } else {
        this.showBottomEdge();
        this.hideTopEdge();
      }
    }

    if (direction === 'panright') { // right
      if (this.edgesVisible().left == 0 && this.edgesVisible().right !== 0) {
        this.hideRightEdge();
        this.hideLeftEdge();
      } else {
        this.showLeftEdge();
        this.hideRightEdge();
      }
    }

    if (direction === 'pandown') { // down
      if (this.edgesVisible().top == 0 && this.edgesVisible().bottom !== 0) {
        this.hideBottomEdge();
        this.hideTopEdge();
      } else {
        this.showTopEdge();
        this.hideBottomEdge();
      }
    }
  }


  isOutside(rect1: DOMRect, rect2: DOMRect): boolean {
    const outsideLeft = rect1.left < rect2.left;
    const outsideRight = rect1.right > rect2.right;
    const outsideTop = rect1.top < rect2.top;
    const outsideBottom = rect1.bottom > rect2.bottom;

    return outsideLeft || outsideRight || outsideTop || outsideBottom;
  }

  isTouchingEdge(draggableRect: DOMRect) {
    console.log(this.container)
    const containerRect = this.container?.nativeElement.getBoundingClientRect();
    if (containerRect) {
      console.log(draggableRect.top, containerRect?.top)
      console.log(draggableRect.left, containerRect?.left)
      console.log(draggableRect.right, containerRect?.right)
      console.log(draggableRect.bottom, containerRect?.bottom)
    }

    const threshold = 2; // sensitivity threshold in pixels
    if (!containerRect) {
      return {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    } else {
      return {
        left: draggableRect.left <= containerRect.left + threshold,
        top: draggableRect.top <= containerRect.top + threshold,
        right: draggableRect.right >= containerRect.right - threshold,
        bottom: draggableRect.bottom >= containerRect.bottom - threshold
      }
    }
  }

  edgesVisible = signal({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  TL_BR = computed(() => {

    const { top, right, bottom, left } = this.edgesVisible();
    return top && !right ||
      left && !bottom ||
      top && bottom && left;
  });

  TR_BR = computed(() => {

    const { top, right, bottom, left } = this.edgesVisible();
    return top && !left ||
      right && !bottom ||
      top && bottom && right;
  });

  BL_BR = computed(() => {

    const { top, right, bottom, left } = this.edgesVisible();
    return left && !top ||
      bottom && !right ||
      bottom && top && left;
  });

  BR_BR = computed(() => {

    const { top, right, bottom, left } = this.edgesVisible();
    return right && !top ||
      bottom && !left ||
      bottom && top && right;
  });



  changeTopEdge(changeBy = this.maxEdgeSize) {
    this.edgesVisible.update((prev) => ({ ...prev, top: this.withinRange(prev.top + changeBy) }))
  }

  changeRightEdge(changeBy = this.maxEdgeSize) {
    this.edgesVisible.update((prev) => ({ ...prev, right: this.withinRange(prev.right + changeBy) }))
  }

  changeBottomEdge(changeBy = this.maxEdgeSize) {
    this.edgesVisible.update((prev) => ({ ...prev, bottom: this.withinRange(prev.bottom + changeBy) }))
  }

  changeLeftEdge(changeBy = this.maxEdgeSize) {
    this.edgesVisible.update((prev) => ({ ...prev, left: this.withinRange(prev.left + changeBy) }))
  }

  showTopEdge() {
    this.edgesVisible.update((prev) => ({ ...prev, top: this.maxEdgeSize }))
  }

  showRightEdge() {
    this.edgesVisible.update((prev) => ({ ...prev, right: this.maxEdgeSize }))
  }

  showBottomEdge() {
    this.edgesVisible.update((prev) => ({ ...prev, bottom: this.maxEdgeSize }))
  }

  showLeftEdge() {
    this.edgesVisible.update((prev) => ({ ...prev, left: this.maxEdgeSize }))
  }


  hideAllEdges() {
    this.edgesVisible.set(({ top: 0, right: 0, bottom: 0, left: 0 }));
  }

  hideTopEdge() {
    this.edgesVisible.update((prev) => ({ ...prev, top: 0 }))
  }

  hideRightEdge() {
    this.edgesVisible.update((prev) => ({ ...prev, right: 0 }))
  }

  hideBottomEdge() {
    this.edgesVisible.update((prev) => ({ ...prev, bottom: 0 }))
  }

  hideLeftEdge() {
    this.edgesVisible.update((prev) => ({ ...prev, left: 0 }))
  }

  withinRange(v: number, min = 0, max = this.maxEdgeSize) {
    return Math.max(0, Math.min(v, this.maxEdgeSize))
  }

}

