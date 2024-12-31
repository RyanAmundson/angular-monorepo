import { Component, OnInit, Input, ComponentRef } from '@angular/core';

@Component({
  selector: 'uic-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss']
})
export class TabsContainer implements OnInit {

  @Input() title;
  @Input() summary;
  @Input() labels:string[];

  constructor() { }

  ngOnInit() {
  }

}
