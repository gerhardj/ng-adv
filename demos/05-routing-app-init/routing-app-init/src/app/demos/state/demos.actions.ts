import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DemoItem } from '../demo-base/demo-item.model';

export const DemoActions = createActionGroup({
  source: 'Demos',
  events: {
    loadDemos: emptyProps(),
    loadDemosSuccess: props<{ items: DemoItem[] }>(),
    loadDemosFailure: props<{ err: Error }>(),
    addDemo: props<{ item: DemoItem }>(),
    addDemoSuccess: props<{ item: DemoItem }>(),
    addDemoFailure: props<{ err: Error }>(),
    updateDemo: props<{ item: DemoItem }>(),
    updateDemoSuccess: props<{ item: DemoItem }>(),
    updateDemoFailure: props<{ err: Error }>(),
    deleteDemo: props<{ item: DemoItem }>(),
    deleteDemoSuccess: props<{ item: DemoItem }>(),
    deleteDemoFailure: props<{ err: Error }>(),
    setSelected: props<{ item: DemoItem }>(),
    applyFilter: props<{ filter: string }>(),
    redirectToError: emptyProps(),
  }
});
