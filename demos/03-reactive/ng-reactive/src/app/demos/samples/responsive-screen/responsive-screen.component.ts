import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-responsive-screen',
  templateUrl: './responsive-screen.component.html',
  styleUrls: ['./responsive-screen.component.scss']
})
export class ResponsiveScreenComponent {
  breakpointObserver = inject(BreakpointObserver);

  matches = this.breakpointObserver
    .observe(['(min-width: 600px)'])

  class = this.matches.pipe(map((state: BreakpointState) => {
    return state.matches ? 'largeClass' : 'smallClass';
  }));
}
