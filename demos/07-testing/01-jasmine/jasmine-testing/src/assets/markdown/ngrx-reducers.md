- Examine `app.reducer.ts` and `app.reducer.spec.ts`:

  ```typescript
  export interface AppState {
    IsMockAuthenticated: boolean;
    sideNavVisible: boolean;
    sideNavPosition: MatDrawerMode;
  }

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
  ```
