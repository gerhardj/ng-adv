import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, appState } from '../../../state/app.state';
import { appActions } from '../../../state/app.actions';

@Component({
  selector: 'app-dispatch-action',
  templateUrl: './dispatch-action.component.html',
  styleUrls: ['./dispatch-action.component.scss']
})
export class DispatchActionComponent {
  store = inject(Store<AppState>);

  isMockAuthenticated = this.store.select(appState.selectIsMockAuthenticated);

  toggleAuth() {
    this.store.dispatch(appActions.toggleMockAuthenticated());
  }
}