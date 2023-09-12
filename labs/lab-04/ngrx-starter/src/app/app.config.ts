import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects'
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appState } from './state/app.state';
import { DefaultDataServiceConfig, provideEntityData, withEffects } from '@ngrx/data';
import { foodDataServiceConfig } from './food/state/food-data-service.config';
import { entityConfig } from './food/state/food.metadata';

export const appConfig: ApplicationConfig = {
    providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideStore(),
    provideState(appState),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    { provide: DefaultDataServiceConfig, useValue: foodDataServiceConfig },
    provideEffects(),
    provideEntityData(entityConfig, withEffects())
],
};