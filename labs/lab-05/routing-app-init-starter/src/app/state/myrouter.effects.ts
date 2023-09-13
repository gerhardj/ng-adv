import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { appActions } from './app.actions';

@Injectable()
export class DemosEffects {
    actions$ = inject(Actions);
    router = inject(Router);

    redirectToError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.redirectToError),
            exhaustMap(() => {
                this.router.navigate(['/error']);
                return EMPTY.pipe(
                    map(() => ({ type: 'Redirected to Error' }))
                );
            })
        )
    );
}