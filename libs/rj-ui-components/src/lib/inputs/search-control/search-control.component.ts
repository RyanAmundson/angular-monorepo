import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'rjui-search-control',
  standalone: true,
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.scss'],
  imports: [
    FormsModule,
    CommonModule
  ] 
})
export class SearchControlComponent {
  @Input() searchText = "";
}
