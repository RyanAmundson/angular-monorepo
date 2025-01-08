import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoResultsComponent } from '../../placeholders/no-results/no-results.component';
import { LoadingIconComponent } from '../../placeholders/loading-icon/loading-icon.component';

@Component({
  selector: 'rjui-contact-detail-panel',
  templateUrl: "./contact-detail-panel.component.html",
  styleUrls: ["./contact-detail-panel.component.scss"],
  standalone: true,
  imports: [CommonModule, NoResultsComponent, LoadingIconComponent]
})
export class ContactDetailPanelComponent {
    _flyoutIsOpen = false;

    @Input() title!: string;
    @Input() loading!: boolean;
    @Input() noResults!: boolean;
    @Input() noResultsText!: string;
    @Output() flyoutOpen: EventEmitter<boolean> = new EventEmitter();
    @Output() flyoutClose: EventEmitter<boolean> = new EventEmitter();


    toggleFlyout(open?: boolean) {
        this._flyoutIsOpen = open ?? false;
       if (open) {
           this.flyoutOpen.emit();
       }
       else {
           this.flyoutClose.emit();
       }
    }


}