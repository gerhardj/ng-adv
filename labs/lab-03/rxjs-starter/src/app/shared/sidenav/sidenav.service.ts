import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import {MatDrawerMode} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

breakpointObserver = inject(BreakpointObserver);

sideNavVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
sideNavPosition: BehaviorSubject<MatDrawerMode> = new BehaviorSubject<MatDrawerMode>('side');

constructor() {
  this.watchScreen.subscribe();
}

watchScreen = this.breakpointObserver
  .observe([Breakpoints.XSmall, Breakpoints.Small])
  .pipe(
    tap((matchesBreakpoint) => {
      console.log(matchesBreakpoint);
      this.sideNavVisible.next(matchesBreakpoint.matches ? false : true);
      this.sideNavPosition.next(matchesBreakpoint.matches ? 'over' : 'side');
    })
  );

toggleMenuVisibility() {
  const visible = !this.sideNavVisible.getValue();
  this.sideNavVisible.next(visible);
}
}
