import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain(
      'First Nx Monorepo App'
    );
  });
  