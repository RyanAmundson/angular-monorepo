import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'rjui-link-block',
    templateUrl: './link-block.html',
    styleUrls: ['./link-block.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class LinkBlockComponent {
    @Input() text = '';
    @Input() icon = '';
    @Input() highlight?: string;//for highlight filter
    @Input() class = '';
    @Input() routerLink = '';
}
