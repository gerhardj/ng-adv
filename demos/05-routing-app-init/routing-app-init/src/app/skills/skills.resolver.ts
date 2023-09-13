import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { SkillsEntityService } from './skills-entity.service';

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