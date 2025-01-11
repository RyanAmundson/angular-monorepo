import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { OptionCardComponent } from '@opc';
import { LayoutComponent } from '@rj/angular-ui-components';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent, MatListModule, MatButtonModule, MatMenuModule, MatIconModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  active = "Containers";
  lomContent = true;
  romContent = true;
  lsmfContent = false;
  lsmContent = true;
  rsmContent = true;
  qnContent = true;
  nbContent = true;
  modalContent = true;
  overlayContent = true;
}
