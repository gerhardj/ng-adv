import { fakeAsync, flush, TestBed, ComponentFixture } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentWriteComponent } from './component-write.component';

describe('ComponentWriteComponent', () => {
  let fixture: ComponentFixture<ComponentWriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatCardModule, MatInputModule, NoopAnimationsModule],
      declarations: [ComponentWriteComponent],
    });
    fixture = TestBed.createComponent(ComponentWriteComponent);
  });

  it('should be display the written Value', fakeAsync(() => {
    const whippet = 'Soi the Whippet';
    const giro = 'Giro the Hunter from Spain';

    fixture.autoDetectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    const el = input.nativeElement;
    flush();

    expect(el.value).toBe(giro);
    el.value = whippet;
    el.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.user.username).toBe(whippet);
  })
  );
});
