- Explain the AppState in `app.state`:

```typescript
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
```

- Explain Action Creators:

```typescript
export const appActions = createActionGroup({
  source: 'App',
  events: {
    toggleMockAuthenticated: emptyProps(),
    toggleSideNav: emptyProps(),
    changeSideNavPosition: props<{ position: string }>(),
    changeSideNavVisible: props<{ visible: boolean }>(),
  }
});
```

- Examine root state in /app/state/index.ts and explain `State` and `ActionReducerMap`:

```typescript
export interface State {
  app: AppState;
}
export const reducers: ActionReducerMap<State> = {
  app: appState.reducer,
};
```