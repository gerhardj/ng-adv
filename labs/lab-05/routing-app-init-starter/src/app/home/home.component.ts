import { Component, inject } from '@angular/core';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { appActions } from '../state/app.actions';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true
})
export class HomeComponent {
    store = inject(Store<AppState>) as Store<AppState>;
buttonclicked() {
    console.log("button clicked");
    this.store.dispatch(appActions.redirectToError());
}
}