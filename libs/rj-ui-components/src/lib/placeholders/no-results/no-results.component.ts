import { Component, Input } from '@angular/core';

@Component({
  selector: 'rjui-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss'],
  standalone: true,
})
export class NoResultsComponent {
    @Input() text = 'No results';
}
