import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicAlertComponent } from './alerts/basic-alert/basic-alert.component';
// import { IpzAlertService } from '../layouts/layout1/services/alert.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations:[
    BasicAlertComponent
  ],
  exports:[
    BasicAlertComponent
  ],
  entryComponents:[
    // BasicAlertComponent
  ],
  providers:[
    // IpzAlertService
  ]
})
export class DialogsModule { }
