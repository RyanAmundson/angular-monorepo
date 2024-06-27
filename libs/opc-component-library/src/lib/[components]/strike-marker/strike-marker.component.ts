import { Component, Input } from '@angular/core';

@Component({
  selector: 'opc-strike-marker',
  templateUrl: './strike-marker.component.html',
  styleUrls: ['./strike-marker.component.scss'],
})
export class StrikeMarkerComponent {

@Input() underlying:number;

}
