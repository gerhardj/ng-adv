import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DemoItem } from '../demo-base/demo-item.model';
// import { getAllDemos, getFilter, getSelected, hasLoaded } from './demo.selectors';
import { DemoActions } from './demos.actions';
import { DemoState, demoState, getAllDemos } from './demos.state';

@Injectable({
  providedIn: 'root',
})
export class DemoFacade {
  store = inject(Store<DemoState>)
  init() {
    this.hasLoaded().subscribe((loaded) => {
      if (!loaded) {
        this.store.dispatch(DemoActions.loadDemos());
      }
    });
  }

  hasLoaded() {
    return this.store.select(demoState.selectLoaded).pipe(take(1));
  }

  getDemos() {
    return this.store.select(getAllDemos);
  }

  getSelectedDemo() {
    return this.store.select(demoState.selectSelected);
  }

  deleteDemo(item: DemoItem) {
    this.store.dispatch(DemoActions.deleteDemo({ item }));
  }

  addDemo(item: DemoItem) {
    this.store.dispatch(DemoActions.addDemo({ item }));
  }

  updateDemo(item: DemoItem) {
    this.store.dispatch(DemoActions.updateDemo({ item }));
  }

  selectDemo(item: DemoItem) {
    this.store.dispatch(DemoActions.setSelected({ item }));
  }

  setFilter(filter: string) {
    this.store.dispatch(DemoActions.applyFilter({ filter }));
  }

  getFilter() {
    return this.store.select(demoState.selectFilter);
  }
}
