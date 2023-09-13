Data preloading using @ngrx/data in `skills.module.ts`. Examine `skills.resolver.ts`:

```typescript
export const skillsResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
  const service = inject(SkillsEntityService);
  console.log('resolver');
  switch (state.url) {
    case '/skills':
      return service.entities$.pipe(
        take(1),
        mergeMap((skillsData) => {
          if (skillsData) {
            return of(skillsData);
          }
          else {
            return EMPTY;
          }
        }),
      );
    default:
      return EMPTY;
  }
};
```