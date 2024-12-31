import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'rjui-modal-page',
  standalone: true,
  imports: [CommonModule, GenericPageComponent],
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss']
})
export class ModalPageComponent {}
