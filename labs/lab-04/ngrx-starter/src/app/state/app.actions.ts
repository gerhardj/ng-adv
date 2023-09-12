import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const appActions = createActionGroup(
    {
      source: 'app',
      events: {
        toggleSideNav: emptyProps(),
        changeSideNavVisible: props<{ visible: boolean }>(),
        changeSideNavPosition: props<{ position: string }>(),
      },
    }
  );