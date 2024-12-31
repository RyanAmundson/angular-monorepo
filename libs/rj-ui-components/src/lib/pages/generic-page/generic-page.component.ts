import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../layouts/layout1/layout.component';

@Component({
  selector: 'rjui-generic-page',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss']
})
export class GenericPageComponent {
  @Input() title!: string;
}
