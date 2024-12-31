import { Component, ViewChildren, QueryList } from '@angular/core';
import { DocumentationComponent } from '../containers/documentation/documentation.component';
import { CommonModule } from '@angular/common';
import { AddPlusComponent } from './add-plus/add-plus.component';
import { LinkBlockComponent } from './link-block/link-block';
import { DeleteXComponent } from './delete-x/delete-x.component';
import { RoundAddButtonComponent } from './round-add-button/round-add-button.component';
import { IconChipComponent } from './icon-chip/icon-chip.component';

@Component({
  selector: 'rjui-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
  standalone: true,
  imports: [CommonModule, DocumentationComponent, AddPlusComponent, DeleteXComponent, LinkBlockComponent, IconChipComponent, RoundAddButtonComponent],    
})
export class ButtonsComponent {
  @ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();

sectionList:string[] = [
  "add-plus",
  "Delete-x",
  "link-block",
  "icon-chip",
  "round-add-button"
];

elementIdList:string[] = ['doc1','doc2','doc3','doc4','doc5']

}
