import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material.module';
import { FormattingModule } from '../shared/formatting/formatting.module';
import { MarkdownEditorModule } from '../shared/markdown-editor/markdown-editor.module';
import { MarkdownRendererModule } from '../shared/markdown-renderer/markdown-renderer.module';
import { SharedModule } from '../shared/shared.module';
import { UxModule } from '../ux/ux.module';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import { AppInitComponent } from './samples/app-init/app-init.component';
import { AuxiliaryRoutesComponent } from './samples/auxilary-routes/auxiliary-routes.component';
import { CodeSplittingComponent } from './samples/code-splitting/code-splitting.component';
import { DiInjectComponent } from './samples/di-inject/di-inject.component';
import { GlobalErrorsComponent } from './samples/global-errors/global-errors.component';
import { HttpErrorsComponent } from './samples/http-errors/http-errors.component';
import { LocServiceComponent } from './samples/loc-service/loc-service.component';
import { MembersComponent } from './samples/multi-guard/members/members.component';
import { MultiGuardComponent } from './samples/multi-guard/multi-guard.component';
import { onlyAuthenticatedGuard } from './samples/multi-guard/only-authenticated.guard';
import { onlyPrimeMembersGuard } from './samples/multi-guard/only-prime-members.guard';
import { PrimeComponent } from './samples/multi-guard/prime/prime.component';
import { MultiInterceptorComponent } from './samples/multi-interceptor/multi-interceptor.component';
import { PreloadingNgrxComponent } from './samples/preloading-ngrx/preloading-ngrx.component';
import { RouterAnimationsComponent } from './samples/router-animations/router-animations.component';
import { RouterBindingComponent } from './samples/router-binding/router-binding.component';
import { RoutingTargetComponent } from './samples/routing/routing-target/routing-target.component';
import { RoutingComponent } from './samples/routing/routing/routing.component';
import { DemosEffects } from './state/demos.effects';
import { NgrxRouterActionsComponent } from './samples/ngrx-router-actions/ngrx-router-actions.component';
import { demoState } from './state/demos.state';

const demoRoutes: Routes = [
  {
    path: '',
    component: DemoContainerComponent,
    children: [
      {
        path: 'inject',
        component: DiInjectComponent,
      },
      {
        path: 'app-init',
        component: AppInitComponent,
      },
      {
        path: 'auxiliary-routes',
        component: AuxiliaryRoutesComponent,
      },
      {
        path: 'code-splitting',
        component: CodeSplittingComponent,
      },
      {
        path: 'ngrx-routing',
        component: RoutingComponent,
        children: [{ path: ':id', component: RoutingTargetComponent }],
      },
      {
        path: 'locationsrv',
        component: LocServiceComponent,
      },
      {
        path: 'router-bindings',
        component: RouterBindingComponent,
      },
      {
        path: 'ngrx-resolver',
        component: PreloadingNgrxComponent,
      },
      {
        path: 'ngrx-router-actions',
        component: NgrxRouterActionsComponent,
      },
      {
        path: 'multi-guard',
        component: MultiGuardComponent,
        children: [
          {
            path: 'members',
            component: MembersComponent,
            canActivate: [
              onlyAuthenticatedGuard
            ],
          },
          {
            path: 'prime',
            component: PrimeComponent,
            canActivate: [
              onlyAuthenticatedGuard,
              onlyPrimeMembersGuard
            ],
          },
        ],
      },
      {
        path: 'multi-interceptor',
        component: MultiInterceptorComponent,
      },
      {
        path: 'global-errors',
        component: GlobalErrorsComponent,
      },
      {
        path: 'http-errors',
        component: HttpErrorsComponent,
      },
      {
        path: 'router-animations',
        component: RouterAnimationsComponent,
      }
    ],
  },
];

@NgModule({
  declarations: [
    DemoContainerComponent,
    RoutingComponent,
    RoutingTargetComponent,
    LocServiceComponent,
    MultiGuardComponent,
    MultiInterceptorComponent,
    GlobalErrorsComponent,
    MembersComponent,
    PrimeComponent,
    HttpErrorsComponent,
    RouterAnimationsComponent,
    AppInitComponent,
    PreloadingNgrxComponent,
    CodeSplittingComponent,
    AuxiliaryRoutesComponent,
    DiInjectComponent,
    RouterBindingComponent,
    NgrxRouterActionsComponent
  ],
  imports: [
    CommonModule,
    UxModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(demoRoutes),
    MaterialModule,
    MarkdownRendererModule,
    MarkdownEditorModule,
    SharedModule,
    StoreModule.forFeature(demoState),
    EffectsModule.forFeature([DemosEffects]),
    FormattingModule,
  ],
  providers: [
    provideHttpClient()
  ],
})
export class DemosModule { }
