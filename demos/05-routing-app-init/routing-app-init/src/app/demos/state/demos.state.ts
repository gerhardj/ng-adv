import {
  createEntityAdapter,
  EntityAdapter,
  EntityState,
  Update,
} from '@ngrx/entity';
import { createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { DemoItem } from '../demo-base/demo-item.model';
import { DemoActions } from './demos.actions';


// State
export const demosFeatureKey = 'demos';

// internal entity structure
// interface EntityState<T> {
//   ids: string[];
//   entities: { [id: string]: T };
// }

export interface DemoState extends EntityState<DemoItem> {
  loaded: boolean;
  selected: DemoItem;
  filter: string;
}

export const demosAdapter: EntityAdapter<DemoItem> =
  createEntityAdapter<DemoItem>();

export const defaultDemoItemState: DemoState = {
  ids: [],
  entities: {},
  loaded: false,
  filter: '',
  selected: new DemoItem()
};

export const initialState = demosAdapter.getInitialState(defaultDemoItemState);

export const demoState = createFeature({
  name: demosFeatureKey,
  reducer: createReducer(
    initialState,
    on(DemoActions.loadDemosSuccess, (state, action) => {
      return demosAdapter.setAll(action.items, {
        ...state,
        loaded: true,
      });
    }),
    on(DemoActions.updateDemoSuccess, (state, action) => {
      const item: Update<DemoItem> = {
        id: action.item.id,
        changes: { visible: action.item.visible },
      };
      return demosAdapter.updateOne(item, { ...state });
    }),
    on(DemoActions.deleteDemoSuccess, (state, action) => {
      return demosAdapter.removeOne(action.item.id, {
        ...state,
      });
    }),
    on(DemoActions.setSelected, (state, action) => {
      return { ...state, selected: action.item };
    }),
    on(DemoActions.applyFilter, (state, action) => {
      return { ...state, filter: action.filter };
    }),
    on(
      DemoActions.updateDemoFailure,
      DemoActions.deleteDemoFailure,
      DemoActions.loadDemosFailure, (state, action) => {
        return { ...state };
      }))
});

export const { selectAll, selectEntities, selectIds, selectTotal } =
  demosAdapter.getSelectors();

export const getDemoState = createFeatureSelector<DemoState>(demosFeatureKey);

export const getAllDemos = createSelector(getDemoState, selectAll);
