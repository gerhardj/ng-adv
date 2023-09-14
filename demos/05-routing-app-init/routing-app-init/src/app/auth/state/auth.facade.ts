import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { authActions } from './auth.actions';
import { AuthState, authState } from './auth.state';

@Injectable({
    providedIn: 'root',
})
export class AuthFacade {
    store = inject(Store) as Store<AuthState>;

    isAuthenticated() {
        return this.store.select(authState.selectUser).pipe(
            map((user) => {
                return user != null;
            })
        );
    }

    hasPrimeSubscription() {
        return this.store.select(authState.selectIsPrimeMember)
    }

    setFakeUserAndToken(email: string) {
        this.store.dispatch(authActions.setFakeUserAndToken({ email }));
    }

    getAuthResult() {
        return this.store.select(authState.selectAuthResult);
    }

    getUser() {
        return this.store.select(authState.selectUser).pipe(map((user) => {
            return user == null ? 'Anonymous' : user;
        }));
    }

    signIn(username: string, password: string) {
        this.store.dispatch(authActions.logIn({ username, password }));
    }

    signOut() {
        this.store.dispatch(authActions.logOut());
    }

    toggleLoggedIn() {
        this.store.dispatch(authActions.toggleLoggedIn());
    }

    togglePrimeMember() {
        this.store.dispatch(authActions.togglePrimeMember());
    }
}