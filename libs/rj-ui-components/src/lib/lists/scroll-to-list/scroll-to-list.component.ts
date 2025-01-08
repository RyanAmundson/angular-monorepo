import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ipz-scroll-to-list',
  templateUrl: './scroll-to-list.component.html',
  styleUrls: ['./scroll-to-list.component.scss']
})
export class ScrollToListComponent implements OnInit {

  @Input() sectionList:string[];
  @Input() elementIdList:string[];

  constructor() { }

  ngOnInit() {
  }

}
