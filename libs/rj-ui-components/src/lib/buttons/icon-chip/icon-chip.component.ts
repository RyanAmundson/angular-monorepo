import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
    selector: 'rjui-icon-chip-button',
    templateUrl: './icon-chip.component.html',
    styleUrls: ['./icon-chip.component.scss'],
    standalone: true,
    imports: [CommonModule, MatIconModule],
})
export class IconChipComponent {
    @Input() name = '';
    @Input() icon = ''; //mat icon
    @Input() fullWidth = true;

    onClick(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
    }

}
