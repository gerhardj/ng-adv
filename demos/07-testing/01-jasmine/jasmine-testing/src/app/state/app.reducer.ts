import { createReducer, on } from '@ngrx/store';
import {
  changeSideNavPosition,
  changeSideNavVisible,
  toggleMockAuthenticated,
  toggleSideNav,
} from './app.actions';
import { MatDrawerMode } from '@angular/material/sidenav';

export const appFeatureKey = 'app';

export interface AppState {
  IsMockAuthenticated: boolean;
  sideNavVisible: boolean;
  sideNavPosition: MatDrawerMode;
}

export const initialAppState: AppState = {
  IsMockAuthenticated: false,
  sideNavVisible: true,
  sideNavPosition: 'side',
};

export const appReducer = createReducer(initialAppState,
  on(toggleSideNav, (state) => ({
    ...state,
    sideNavVisible: !state.sideNavVisible,
  })),
  on(changeSideNavVisible, (state, action) => ({
    ...state,
    sideNavVisible: action.visible,
  })),
  on(changeSideNavPosition, (state, action) => ({
    ...state,
    sideNavPosition: action.position as MatDrawerMode,
  })),
  on(toggleMockAuthenticated, (state, action) => ({ ...state, IsMockAuthenticated: !state.IsMockAuthenticated }))
);
