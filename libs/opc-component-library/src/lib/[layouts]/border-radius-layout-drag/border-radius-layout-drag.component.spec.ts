import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BorderRadiusLayoutDragComponent } from './border-radius-layout-drag.component';

describe('BorderRadiusLayoutComponent', () => {
  let component: BorderRadiusLayoutDragComponent;
  let fixture: ComponentFixture<BorderRadiusLayoutDragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorderRadiusLayoutDragComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BorderRadiusLayoutDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
