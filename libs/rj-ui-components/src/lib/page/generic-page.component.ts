import { Component, Input, ContentChildren, QueryList, ElementRef, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from '../containers/documentation/documentation.component';
import { LayoutComponent } from '../layouts/layout1/layout.component';
import { HorizontalCardScrollerComponent } from '../containers/horizontal-card-scroller/horizontal-card-scroller.component';

@Component({
  selector: 'rjui-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss'],
  standalone: true,
  imports: [CommonModule, DocumentationComponent, LayoutComponent, HorizontalCardScrollerComponent]
})
export class GenericPageComponent implements AfterContentInit {

  @Input() title!: string;

  @ContentChildren(DocumentationComponent, { read: ElementRef }) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

  sectionList!: string[];
  elementIdList: string[] = [];

  ngAfterContentInit() {
    // this.sectionList = this.sections.map((section:any) => section.nativeElement.title);
    this.elementIdList = this.sections.map((section:any) => section.nativeElement.id);
  }

}
