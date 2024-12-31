import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'rjui-add-plus',
    templateUrl: "./add-plus.component.html",
    styleUrls: ["./add-plus.component.css"],
    standalone: true,
    imports: [CommonModule, MatIconModule],
})
export class AddPlusComponent {
}