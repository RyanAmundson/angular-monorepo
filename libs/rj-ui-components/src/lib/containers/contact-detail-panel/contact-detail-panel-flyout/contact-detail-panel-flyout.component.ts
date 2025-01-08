import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'rjui-contact-detail-panel-flyout',
    templateUrl: "./contact-detail-panel-flyout.component.html",
    styleUrls: ['./contact-detail-panel-flyout.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class ContactDetailPanelFlyoutComponent{

    @Input() title!:string;
    @Output() okClick: EventEmitter<boolean> = new EventEmitter();
    @Output() cancelClick: EventEmitter<boolean> = new EventEmitter();
    @Output() flyoutOpen: EventEmitter<boolean> = new EventEmitter();
    @Output() flyoutClose: EventEmitter<boolean> = new EventEmitter();

}