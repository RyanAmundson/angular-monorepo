import { Component, ViewChild, TemplateRef, ViewContainerRef, Input, Output, HostListener, ContentChild, EventEmitter, AfterContentInit, OnInit, OnDestroy } from '@angular/core';
import { LayoutManagerService } from './services/layout-manager.service';
import { CommonModule } from '@angular/common';
import { Core, Custom } from '../../animations/AngularAnimations';
import {OverlayModule} from '@angular/cdk/overlay';


@Component({
    selector: 'rjui-layout-1',
    templateUrl: 'layout.component.html',
    styleUrls: [
        'layout.component.scss'
    ],
    standalone: true,
    imports: [
        CommonModule,
        OverlayModule
    ],
    providers: [
        LayoutManagerService
    ],
    animations: [
        Core.slideUp,
        Core.fadeInUp,
        Core.fadeInDown,
        Core.slideLeft,
        Core.slideRight,
        Core.expandCircle,
        Core.slideFade,
        Core.blink,
        Core.pulse,
        Core.rubberBand,
        Core.listFadeIn,
        Core.listCardFlipIn,
        Custom.slide('0%', '100%', 5000, 'upBy100')
    ]
})
export class LayoutComponent implements AfterContentInit, OnInit, OnDestroy {
    @Input() isMobile = false;

    @Output() ready: EventEmitter<void> = new EventEmitter<void>();

    //use these for container references
    @ViewChild('nbContainer', { read: ViewContainerRef, static: false }) nbContainer!: ViewContainerRef;
    @ViewChild('lsmContainer', { read: ViewContainerRef, static: false }) lsmContainer!: ViewContainerRef;
    @ViewChild('lsmfContainer', { read: ViewContainerRef, static: false }) lsmfContainer!: ViewContainerRef;
    @ViewChild('mcContainer', { read: ViewContainerRef, static: false }) mcContainer!: ViewContainerRef;
    @ViewChild('rsmContainer', { read: ViewContainerRef, static: false }) rsmContainer!: ViewContainerRef;
    @ViewChild('qnContainer', { read: ViewContainerRef, static: false }) qnContainer!: ViewContainerRef;
    @ViewChild('lomContainer', { read: ViewContainerRef, static: false }) lomContainer!: ViewContainerRef;
    @ViewChild('romContainer', { read: ViewContainerRef, static: false }) romContainer!: ViewContainerRef;
    @ViewChild('rsmfContainer', { read: ViewContainerRef, static: false }) rsmfContainer!: ViewContainerRef;
    @ViewChild('modalContainer', { read: ViewContainerRef, static: false }) modalContainer!: ViewContainerRef;
    @ViewChild('overlayContainer', { read: ViewContainerRef, static: false }) overlayContainer!: ViewContainerRef;
    @ViewChild('alertsContainer', { read: ViewContainerRef, static: false }) alertsContainer!: ViewContainerRef;
    @ViewChild('layoutContainer', { read: ViewContainerRef, static: false }) layoutContainer!: ViewContainerRef;

    @ContentChild(TemplateRef, {static: false}) tR!: TemplateRef<any>;
    @ContentChild("nb", {static: false}) navbar!: TemplateRef<Element>;
    @ContentChild("lsm", {static: false}) leftSideMenu!: TemplateRef<Element>;
    @ContentChild("lsmf", {static: false}) leftSideMenuFull!: TemplateRef<Element>;
    @ContentChild("mc", {static: false}) mainContent!: TemplateRef<Element>;
    @ContentChild("rsm", {static: false}) rightSideMenu!: TemplateRef<Element>;
    @ContentChild("qn", {static: false}) quickNav!: TemplateRef<Element>;
    @ContentChild("lom", {static: false}) leftOverlayMenu!: TemplateRef<Element>;
    @ContentChild("rom", {static: false}) rightOverlayMenu!: TemplateRef<Element>;
    @ContentChild("rsmf", {static: false}) rightSideMenuFull!: TemplateRef<Element>;
    @ContentChild("modal", {static: false}) modal!: TemplateRef<Element>;
    @ContentChild("overlay", {static: false}) overlay!: TemplateRef<Element>;



    screen: { h: number, w: number } = { h: window.innerHeight, w: window.innerWidth };
    state: string[] = ['nb', 'qn', 'lsm', 'lsmf', 'rsm', 'alerts', 'rsmf'];   //['lsmf', 'lom', 'rom', 'rsm', 'lsm', 'nb', 'qn','modal','overlay']
    get mobile() { return this.screen.w < 812; }

    @HostListener('window:resize')
    onResize() {
        this.screen.w = window.innerWidth;
    }

    constructor(private layoutManager: LayoutManagerService) {
    }

    ngOnInit() {
        this.layoutManager.register(this);
    }

    ngOnDestroy() {
        this.layoutManager.deregister(this);
    }

    ngAfterContentInit() {
        this.ready.emit()
    }
    
    toggleMenu(name: string, state?: boolean) {
        if (state != null) {
            (state) ? this.addMenu(name) : this.removeMenu(name);
        } else {
            this.state.indexOf(name) !== -1 ? this.removeMenu(name) : this.addMenu(name);
        }
    }

    addMenu(name: string) {
        this.state.push(name);
    }

    removeMenu(name: string) {
        const index = this.state.indexOf(name);
        this.state.splice(index, 1);
    }


    public outsideClick(menu: string) {
        this.removeMenu(menu);
    }

    public insideClick(name: string) {
        // No operation needed if event is not used
    }
}
