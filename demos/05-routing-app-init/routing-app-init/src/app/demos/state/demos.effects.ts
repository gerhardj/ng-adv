import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { DemoService } from '../demo-base/demo.service';
import { DemoActions } from './demos.actions';
import { Router } from '@angular/router';

@Injectable()
export class DemosEffects {
  actions$ = inject(Actions);
  service = inject(DemoService);
  router = inject(Router);

  loadDemos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DemoActions.loadDemos),
      mergeMap(() =>
        this.service.getItems().pipe(
          map((demos) => DemoActions.loadDemosSuccess({ items: demos })),
          catchError((err) => of(DemoActions.loadDemosFailure({ err })))
        )
      )
    )
  );

  addDemos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DemoActions.addDemo),
      mergeMap((action) =>
        this.service.addItem(action.item).pipe(
          map((demos) => DemoActions.addDemoSuccess({ item: demos })),
          catchError((err) => of(DemoActions.addDemoFailure({ err })))
        )
      )
    )
  );

  updateDemos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DemoActions.updateDemo),
      mergeMap((action) =>
        this.service.updateItem(action.item).pipe(
          map((demos) => DemoActions.updateDemoSuccess({ item: demos })),
          catchError((err) => of(DemoActions.updateDemoFailure({ err })))
        )
      )
    )
  );

  deleteDemo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DemoActions.deleteDemo),
      mergeMap((action) =>
        this.service.deleteItem(action.item.id).pipe(
          map(() => DemoActions.deleteDemoSuccess({ item: action.item })),
          catchError((err) => of(DemoActions.deleteDemoFailure({ err })))
        )
      )
    )
  );

  redirectToError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DemoActions.redirectToError),
      exhaustMap(() => {
        this.router.navigate(['/error']);
        return EMPTY.pipe(
          map(() => ({ type: 'Redirected to Error' }))
        );
      })
    )
  );
}
