import { Component, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentationComponent } from '../containers/documentation/documentation.component';
import { SearchControlComponent } from './search-control/search-control.component';
import { GenericPageComponent } from '../pages/generic-page/generic-page.component';

@Component({
  selector: 'rjui-inputs',
  standalone: true,
  imports: [DocumentationComponent, CommonModule, FormsModule, SearchControlComponent, GenericPageComponent],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent {
  @ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

}
