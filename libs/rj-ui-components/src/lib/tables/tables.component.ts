import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {


  gradientTable = {
    xLegend:[
      "11/1",
      "11/2",
      "11/3",
      "11/4",
      "11/5",
      "11/6",
      "11/7",
      "11/8",
      "11/9",
      "11/10",
    ],
    yLegend:[
      30.00,
      29.00,
      28.50,
      28.00,
      27.50,
      27.00,
      26.50,
      26.00,
      25.50,
      25.00,
    ],
    dataSource:[
      [50,40,30,20,10,0,0,0,0,0],
      [49,39,29,19,9,0,0,0,0,0],
      [48,38,28,18,8,0,0,0,0,0],
      [47,37,27,17,7,0,0,0,0,0],
      [46,36,26,16,6,0,0,0,0,0],
      [45,35,25,15,5,0,0,0,0,0],
      [44,34,24,14,4,0,0,0,0,0],
      [43,33,23,13,3,0,0,0,0,0],
      [42,32,22,12,2,0,0,0,0,0],
      [41,31,21,11,1,0,0,0,0,0],
    ],
    lowestValue:0,
    highestValue:50
  }

  constructor() { }

  ngOnInit() {
  }

}
