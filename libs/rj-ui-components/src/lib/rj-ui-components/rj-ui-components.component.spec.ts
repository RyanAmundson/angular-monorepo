import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RjUiComponentsComponent } from './rj-ui-components.component';

describe('RjUiComponentsComponent', () => {
  let component: RjUiComponentsComponent;
  let fixture: ComponentFixture<RjUiComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RjUiComponentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RjUiComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
