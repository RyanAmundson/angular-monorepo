import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule, MatChipSet } from '@angular/material/chips';

@Component({
  selector: 'rjui-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  standalone: true, 
  imports: [CommonModule, MatTabsModule, MatChipsModule, MatChipSet],
})
export class DocumentationComponent {

  @Input() title!: string;
  @Input() summary!: string;
  @Input() labels!: string[];


}
