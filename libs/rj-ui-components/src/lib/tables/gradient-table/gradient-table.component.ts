import { Component, OnInit, ViewChild, Query, QueryList, ElementRef, Renderer2, Input } from '@angular/core';

@Component({
  selector: 'gradient-table',
  templateUrl: './gradient-table.component.html',
  styleUrls: ['./gradient-table.component.scss']
})
export class GradientTableComponent{

  @ViewChild('gradientContent', { read: ElementRef, static: false }) gradientContent: ElementRef;
  @ViewChild('scrollTop', { read: ElementRef, static:false }) scrollTop: ElementRef;
  @ViewChild('scrollLeft', { read: ElementRef, static: false }) scrollLeft: ElementRef;
  @Input() xLegend: any[];
  @Input() yLegend: any[];
  @Input() dataSource: any[][];
  @Input() lowestValue: number;
  @Input() highestValue: number;
  errors:string[] = [];

  gradientStops: string[] =
  [
      '#CC0000',
      '#CE0A0A',
      '#D01515',
      '#D21F1F',
      '#D42A2A',
      '#D63535',
      '#D83F3F',
      '#DA4A4A',
      '#DD5555',
      '#DF5F5F',
      '#E16A6A',
      '#E37474',
      '#E57F7F',
      '#E78A8A',
      '#E99494',
      '#EB9F9F',
      '#EEAAAA',
      '#F0B4B4',
      '#F2BFBF',
      '#F4C9C9',
      '#F6D4D4',
      '#F8DFDF',
      '#FAE9E9',
      '#FCF4F4',
      '#FFFFFF',
      '#F4FCF4',
      '#E9FAE9',
      '#DFF8DF',
      '#D4F6D4',
      '#C9F4C9',
      '#BFF2BF',
      '#B4F0B4',
      '#AAEEAA',
      '#9FEB9F',
      '#94E994',
      '#8AE78A',
      '#7FE57F',
      '#74E374',
      '#6AE16A',
      '#5FDF5F',
      '#55DD55',
      '#4ADA4A',
      '#3FD83F',
      '#35D635',
      '#2AD42A',
      '#1FD21F',
      '#15D015',
      '#0ACE0A',
      '#00CC00',
    ];

    gradientMap: Map<number, string> = new Map<number, string>();
    cellSize = '50px';


  constructor(private renderer: Renderer2) {

  }

  ngOnChanges(){
    this.checkForErrors();
    if(!this.errors || this.errors.length == 0){
      this.buildGradientMap(this.lowestValue,this.highestValue);
    }
  }

  scroll(event) {
    switch (event.srcElement.id) {
      case 'gradient-content':
        this.scrollTop.nativeElement.scroll(event.srcElement.scrollLeft, 0);
        this.scrollLeft.nativeElement.scroll(0, event.srcElement.scrollTop);
        break;
      case 'scroll-top':
        // this.gradientContent.nativeElement.scroll(event.srcElement.scrollLeft, 0);
        // this.renderer.setStyle(this.gradientContent.nativeElement,'transform','translate(50px,0)');
        break;
      case 'scroll-left':
        // this.snapTo(this.scrollLeft, 0, Math.floor(event.srcElement.scrollTop/50),50)
        // this.gradientContent.nativeElement.scroll(0, event.srcElement.scrollTop);
        break;
    }
  }

  snapTo(el: ElementRef, cellX: number, cellY: number, intervalSize: number) {
    el.nativeElement.scrollBy({
      left: cellX * intervalSize,
      top: cellY * intervalSize,
      behavior: 'smooth'
    });
  }

  buildGradientMap(low: number, high: number) {
    console.log(this.gradientStops);
    this.gradientMap.set(low, this.gradientStops[0]);
    this.gradientMap.set(high, this.gradientStops[this.gradientStops.length - 1]);

    for (let i = low; i < high; i++) {
      console.log(Math.floor(((i / high) * 100) / 4));
      this.gradientMap.set(i, this.gradientStops[Math.floor(((i / high) * 100) / (100/this.gradientStops.length))]);
    }
  }

  checkForErrors(){
    this.checkSizeError();

  }

  checkSizeError(){
    if(!this.dataSource || this.dataSource.length == 0){
      this.errors.push("No data in data source");
      return;
    }
    let xL = this.xLegend.length;
    let yL = this.yLegend.length;
    let dsX = this.dataSource[0].length;
    let dsY = this.dataSource.length;

    if(dsX != dsY){
      this.errors.push("Grid must be square");
      return;
    }
    if(xL != dsX){
      this.errors.push("x legend must equal width of grid");
      return;
    }
    if(yL != dsY){
      this.errors.push("y legend must equal length of grid");
      return;
    }

  }

}


export interface DataSourceEntry {
  value: number;
  color: string;
}
