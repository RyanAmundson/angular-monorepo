import { Injectable, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { LayoutManagerService } from './layout-manager.service';
import { BasicAlertComponent } from '../../../dialogs/alerts/basic-alert/basic-alert.component';


@Injectable()
export class IpzAlertService {
    activeAlerts: number = 0;

    constructor(private cFR: ComponentFactoryResolver, private layoutManager: LayoutManagerService) { }

    // show<T>(component?: new () => T, context?: T, TTL?: number, vCR?: ViewContainerRef): ComponentRef<any> {
    //     let componentRef:ComponentRef<T>;
    //     let factory;

    //     if (component) {
    //         factory = this.cFR.resolveComponentFactory(component);
    //     } else{
    //         factory = this.cFR.resolveComponentFactory(BasicAlertComponent);
    //     }

    //     if (vCR) {
    //         componentRef = vCR.createComponent(factory)
    //     } else if (this.layoutManager.root && this.layoutManager.root.alertsContainer) {
    //         componentRef = this.layoutManager.root.alertsContainer.createComponent(factory);
    //     } else {
    //         console.error("No root layout or view container");
    //     }

    //     if (TTL) {
    //         setTimeout(() => {
    //             componentRef.destroy();
    //         }, TTL);
    //     } else {
    //         setTimeout(() => {
    //             componentRef.destroy();
    //         }, 5000);
    //     }

    //     componentRef.onDestroy(() => {
    //         this.activeAlerts--;
    //     });
    //     this.activeAlerts++;
    //     Object.assign(componentRef.instance, context);
    //     console.log(this.activeAlerts)
    //     if(this.activeAlerts > 12){
    //         this.clearAll();
    //     }
    //     return componentRef;
    // }


    show<T>(context?: T,TTL?: number, vCR?: ViewContainerRef): ComponentRef<any> {
        let componentRef:ComponentRef<BasicAlertComponent>;
        let factory = this.cFR.resolveComponentFactory(BasicAlertComponent);

        if (vCR) {
            componentRef = vCR.createComponent(factory);
        } else if (this.layoutManager.root && this.layoutManager.root.alertsContainer) {
            componentRef = this.layoutManager.root.alertsContainer.createComponent(factory);
        } else {
            console.error("No root layout or view container");
        }

        if (TTL) {
            setTimeout(() => {
                componentRef.destroy();
            }, TTL);
        } else {
            setTimeout(() => {
                componentRef.destroy();
            }, 5000);
        }

        componentRef.onDestroy(() => {
            this.activeAlerts--;
        });
        this.activeAlerts++;
        Object.assign(componentRef.instance, context);
        console.log(this.activeAlerts)
        if(this.activeAlerts > 8){
            this.clearAll(vCR);
        }
        return componentRef;
    }

    clearAll(vCR?: ViewContainerRef) {
        if (vCR) {
            vCR.clear();
        } else if (this.layoutManager.root && this.layoutManager.root.alertsContainer) {
            this.layoutManager.root.alertsContainer.clear();
        } else {
            console.error("No root layout or view container");
        }
    }

}
