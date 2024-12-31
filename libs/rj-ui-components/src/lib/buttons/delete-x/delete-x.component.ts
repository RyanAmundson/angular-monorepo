import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'rjui-delete-x',
    templateUrl: "./delete-x.component.html",
    styleUrls: ["./delete-x.component.scss"],
    standalone: true,
    imports: [CommonModule, MatIconModule],
})
export class DeleteXComponent {
}
