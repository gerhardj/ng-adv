import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterState,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppInitService, initFactory } from './app-init/app-init.service';
import { configFactory } from './app-init/config.factory';
import { ConfigService } from './app-init/config.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerEditComponent } from './customers/component/customer-edit/customer-edit.component';
import { CustomersComponent } from './customers/component/customer-list/customers.component';
import { CustomerEffects } from './customers/state/customers.effects';
import { ErrPageComponent } from './error/err-page/err-page.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { metaReducers, reducers } from './state';
import { retryInterceptor } from './interceptors/retry-interceptor.service';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { GlobalErrService } from './error/global-err-handler';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrPageComponent,
    CustomersComponent,
    CustomerEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot([CustomerEffects]),
    EntityDataModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'routing-app-init',
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Full,
    }),
    AuthModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([
        retryInterceptor({ count: 5, delay: 1000 })
      ])
    ),
    {
      provide: APP_INITIALIZER,
      useValue: () => {
        console.log('App init 1 running');
      },
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useValue: () => {
        console.log('App init 2 running');
      },
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useValue: () => {
        console.log('App init 3 running');
      },
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      deps: [AppInitService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: FormatInterceptorService,
    //   multi: true,
    // },
    // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpErrorInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
