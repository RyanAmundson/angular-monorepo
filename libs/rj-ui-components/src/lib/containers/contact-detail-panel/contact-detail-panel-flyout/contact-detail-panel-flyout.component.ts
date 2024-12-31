import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'AA-contact-detail-panel-flyout',
    templateUrl: "./contact-detail-panel-flyout.component.html",
    styleUrls: ['./contact-detail-panel-flyout.component.scss']
})
export class ContactDetailPanelFlyoutComponent{

    @Input() title:string;
    @Output() okClick: EventEmitter<boolean> = new EventEmitter();
    @Output() cancelClick: EventEmitter<boolean> = new EventEmitter();
    @Output() flyoutOpen: EventEmitter<boolean> = new EventEmitter();
    @Output() flyoutClose: EventEmitter<boolean> = new EventEmitter();

}