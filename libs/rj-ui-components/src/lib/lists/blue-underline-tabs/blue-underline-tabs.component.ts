import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ipz-blue-underline-tabs',
  templateUrl: './blue-underline-tabs.component.html',
  styleUrls: ['./blue-underline-tabs.component.scss']
})
export class BlueUnderlineTabsComponent implements OnInit {


  @Input() active:string;
  @Input() tabs:string[] = ['test1', 'test2', 'test3'];
  @Input() max?:number = 999;
  @Output() tabClick:EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }

  changeActive(active:string){
    this.active = active;
    this.tabClick.emit(active);
  }

}
