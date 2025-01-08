import { Component, ViewChildren, QueryList } from '@angular/core';
import { DocumentationComponent } from '../containers/documentation/documentation.component';

@Component({
  selector: 'rjui-inputs',
  standalone: true,
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent {
  @ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

}
