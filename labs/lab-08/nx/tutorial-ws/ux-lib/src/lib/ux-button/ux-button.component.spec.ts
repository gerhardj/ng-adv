import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UxButtonComponent } from './ux-button.component';

describe('UxButtonComponent', () => {
  let component: UxButtonComponent;
  let fixture: ComponentFixture<UxButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UxButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UxButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
