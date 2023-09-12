import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Injectable, inject } from "@angular/core";
import { MatDrawerMode } from "@angular/material/sidenav";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, distinctUntilKeyChanged, tap } from "rxjs";
import { appActions } from "src/app/state/app.actions";
import { AppState, appState } from "src/app/state/app.state";

@Injectable({
    providedIn: 'root',
  })
  export class SideNavFacade {
    breakpointObserver = inject(BreakpointObserver);
    store = inject(Store<AppState>);
  
    constructor() {
      this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .pipe(
          distinctUntilKeyChanged('matches'),
          tap((matchesBreakpoints) => {
            console.log("matchesBreakpoint: ", matchesBreakpoints.matches);
            const position: MatDrawerMode = matchesBreakpoints.matches ? 'over' : 'side';
            const visible = matchesBreakpoints.matches ? false : true;
            this.store.dispatch(appActions.changeSideNavVisible({ visible }));
            this.store.dispatch(appActions.changeSideNavPosition({ position }));
          })
        ).subscribe();
    }
  
    getSideNavVisible() {
      return this.store.select(appState.selectSideNavVisible);
    }
  
    getSideNavPosition() {
      return this.store.select(appState.selectSideNavPosition);
    }
  
    toggleMenuVisibility() {
      this.store.dispatch(appActions.toggleSideNav());
    }
  }