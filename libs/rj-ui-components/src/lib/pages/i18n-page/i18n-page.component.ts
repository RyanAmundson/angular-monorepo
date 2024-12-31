import { Component, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from '../../containers/documentation/documentation.component';
import { GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'rjui-i18n-page',
  standalone: true,
  imports: [CommonModule, DocumentationComponent, GenericPageComponent],
  templateUrl: './i18n-page.component.html',
  styleUrls: ['./i18n-page.component.scss'],
})
export class I18nPageComponent {
  @ViewChildren(DocumentationComponent)
  sections: QueryList<DocumentationComponent> =
    new QueryList<DocumentationComponent>();

  sectionList: string[] = [];
}
