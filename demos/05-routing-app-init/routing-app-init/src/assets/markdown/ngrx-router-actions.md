- Examine `demos.effects.ts` and the redirectToError$ effect:

```typescript
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
```