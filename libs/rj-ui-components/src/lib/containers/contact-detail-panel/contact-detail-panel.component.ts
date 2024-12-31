import { Component, Input, OnInit, ViewChild, ContentChild, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'AA-contact-detail-panel',
  templateUrl: "./contact-detail-panel.component.html",
  styleUrls: ["./contact-detail-panel.component.scss"]
})
export class ContactDetailPanelComponent {
    _flyoutIsOpen: boolean = false;

    @Input() title: string;
    @Input() loading: boolean;
    @Input() noResults: boolean;
    @Input() noResultsText: string;
    @Output() flyoutOpen: EventEmitter<boolean> = new EventEmitter();
    @Output() flyoutClose: EventEmitter<boolean> = new EventEmitter();


    toggleFlyout(open?: boolean) {
        this._flyoutIsOpen = open;
       if (open) {
           this.flyoutOpen.emit();
       }
       else {
           this.flyoutClose.emit();
       }
    }


}