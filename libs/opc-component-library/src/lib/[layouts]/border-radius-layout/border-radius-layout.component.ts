import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'opc-border-radius-layout',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './border-radius-layout.component.html',
  styleUrl: './border-radius-layout.component.scss',
})
export class BorderRadiusLayoutComponent {
  @Input() isComponentLayout = false;
  @Input() edgeColor = 'orange';

  containerRect?: DOMRect;

  ngAfterViewInit() {
    const container = document.querySelector('.layout-container');
    this.containerRect = container?.getBoundingClientRect();
  }

  dragMoved(event: CdkDragMove) {
    const draggableRect = event.source.element.nativeElement.getBoundingClientRect();

    console.log(this.isTouchingEdge(draggableRect));

  }

  isTouchingEdge(draggableRect: DOMRect) {
    console.log(draggableRect, this.containerRect)
    const threshold = 2; // sensitivity threshold in pixels
    if (!this.containerRect) return false;
    return {
      left: draggableRect.left <= this.containerRect.left + threshold,
      top: draggableRect.top <= this.containerRect.top + threshold,
      right: draggableRect.right >= this.containerRect.right - threshold,
      bottom: draggableRect.bottom >= this.containerRect.bottom - threshold
    }

  }



  edgesVisible = signal({
    top: false,
    right: false,
    bottom: false,
    left: false,
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



  topEdge() {
    this.edgesVisible.update((prev) => ({ ...prev, top: !prev.top }))
  }

  rightEdge() {
    this.edgesVisible.update((prev) => ({ ...prev, right: !prev.right }))
  }

  bottomEdge() {
    this.edgesVisible.update((prev) => ({ ...prev, bottom: !prev.bottom }))
  }

  leftEdge() {
    this.edgesVisible.update((prev) => ({ ...prev, left: !prev.left }))
  }

}
