import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BorderRadiusLayoutComponent } from './border-radius-layout.component';

describe('BorderRadiusLayoutComponent', () => {
  let component: BorderRadiusLayoutComponent;
  let fixture: ComponentFixture<BorderRadiusLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorderRadiusLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BorderRadiusLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
