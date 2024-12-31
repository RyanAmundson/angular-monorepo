import { Component, OnInit, Input, ContentChildren, QueryList, ElementRef } from '@angular/core';
import { DocumentationComponent } from 'src/app/containers/documentation/documentation.component';

@Component({
  selector: 'ipz-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss']
})
export class GenericPageComponent implements OnInit {

  @Input() title: string;

  @ContentChildren(DocumentationComponent, { read: ElementRef }) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

  sectionList: string[];
  elementIdList: string[] = [];


  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // this.sectionList = this.sections.map((section:any) => section.nativeElement.title);
    this.elementIdList = this.sections.map((section:any) => section.nativeElement.id);
  }

}
