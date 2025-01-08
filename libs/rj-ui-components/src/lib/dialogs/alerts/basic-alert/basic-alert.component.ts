import { Component, OnInit, Input, Output, ElementRef, EventEmitter, ViewContainerRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  query,
  stagger,
  keyframes
} from '@angular/animations';
// import { Core, Custom } from '../../../../assets/AngularAnimations';

@Component({
  selector: 'basic-alert',
  templateUrl: './basic-alert.component.html',
  styleUrls: ['./basic-alert.component.scss'],
  animations: [
    trigger('pieceTogether', [
      transition(':enter', [
        query('*', style({ opacity: 0 }), { optional: true }),
        query('*', stagger('100ms', [
          animate('100ms ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
            style({ opacity: .7, transform: 'translateY(5px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),
      ]),
      transition(':leave', [
        query('*', style({ opacity: 1 }), { optional: true }),
        query('*', stagger('100ms', [
          animate('400ms ease-out', keyframes([
            style({ opacity: 1, transform: 'translateY(0) scaleY(1)', offset: 0 }),
            style({ opacity: .3, transform: 'translateY(-30%) scaleY(0.5)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-100%) scaleY(0)', offset: 1.0 }),
          ]))]), { optional: true }),
      ]),
    ]),
  ],
  host: {
    '[@pieceTogether]': 'true'
  }
})
export class BasicAlertComponent implements OnInit {

  @Input() type: string = "default";
  @Input() message: string = "Alert";
  @Input() options?: { 'color': string, 'border-color': string, 'background-color': string };
  @Input() actionText?: string = "Action";

  @Output() actionClicked?= new EventEmitter<void>();
  @Output() cancelClicked?= new EventEmitter<void>();
  @Output() dismissClicked?= new EventEmitter<void>();
  typeIconClass?: string = "";

  constructor() { }

  ngOnChanges() {

  }

  ngOnInit() {
    switch (this.type) {
      case "success":
        this.options = { 'color': 'white', 'border-color': 'rgb(74, 160, 51)', 'background-color': 'rgb(74, 160, 51)' };
        this.typeIconClass = "fa fa-check";
        break;
      case "error":
        this.options = { 'color': 'white', 'border-color': 'rgb(199, 63, 63)', 'background-color': 'rgb(199, 63, 63)' }
        this.typeIconClass = "fa fa-warning";
        break;
      case "warning":
        this.options = { 'color': 'white', 'border-color': 'rgb(248, 180, 0)', 'background-color': 'rgb(248, 180, 0)' }
        this.typeIconClass = "fa fa-info-circle";
        break;
      case "default":
      default:
        this.options = { 'color': 'rgb(53, 53, 53)', 'border-color': 'rgb(53, 53, 53)', 'background-color': 'rgb(253, 248, 236)' }
        this.typeIconClass = "fa fa-bell";
        break;
    }
  }

  actionClick() {
    this.actionClicked.emit();
  }

  cancelClick() {
    this.cancelClicked.emit();
  }

  dismiss() {
    this.dismissClicked.emit();
  }


}
