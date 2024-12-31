import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoResultsComponent } from '../../placeholders/no-results/no-results.component';
import { DocumentationComponent } from '../../containers/documentation/documentation.component';
import { LoadingIconComponent } from '../../placeholders/loading-icon/loading-icon.component';
import { GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'rjui-placeholders-page',
  standalone: true,
  imports: [CommonModule, NoResultsComponent, DocumentationComponent, LoadingIconComponent, GenericPageComponent],
  templateUrl: './placeholders-page.component.html',
  styleUrls: ['./placeholders-page.component.scss']
})
export class PlaceholdersPageComponent {}
