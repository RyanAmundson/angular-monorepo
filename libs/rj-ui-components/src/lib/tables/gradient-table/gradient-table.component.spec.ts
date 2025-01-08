/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GradientTableComponent } from './gradient-table.component';

describe('GradientTableComponent', () => {
  let component: GradientTableComponent;
  let fixture: ComponentFixture<GradientTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradientTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
