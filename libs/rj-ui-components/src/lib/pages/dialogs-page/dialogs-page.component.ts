import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { DocumentationComponent } from '../../containers/documentation/documentation.component';
import { LayoutComponent } from '../../layouts/layout1/layout.component';
import { IpzAlertService } from '../../layouts/layout1/services/alert.service';
import { BasicAlertComponent } from 'src/app/dialogs/alerts/basic-alert/basic-alert.component';

@Component({
  selector: 'dialogs-page',
  templateUrl: './dialogs-page.component.html',
  styleUrls: ['./dialogs-page.component.scss']
})
export class DialogsPageComponent {
  @ViewChildren(DocumentationComponent) sections: QueryList<DocumentationComponent> = new QueryList<DocumentationComponent>();
  @ViewChild(LayoutComponent, { static: false }) layout: LayoutComponent;

  sectionList:string[] = [
    "Alerts"
  ];

constructor(private alertService:IpzAlertService) {
  }

  showAlert(type: string, message: string, actionText?: string) {
    let alertRef = this.alertService.show(<BasicAlertComponent>{ type: type, message: message, actionText: actionText },5000,this.layout.alertsContainer);
    let alert: BasicAlertComponent = alertRef.instance;

    alert.actionClicked.subscribe((result) => {
      console.log("action");
    })
    alert.cancelClicked.subscribe((result) => {
      console.log("cancel");
    })
    alert.dismissClicked.subscribe(() => {
      alertRef.destroy();
    })
  }

}
