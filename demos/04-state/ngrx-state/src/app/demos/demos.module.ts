import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material.module';
import { MarkdownEditorModule } from '../shared/markdown-editor/markdown-editor.module';
import { MarkdownRendererModule } from '../shared/markdown-renderer/markdown-renderer.module';
import { SharedModule } from '../shared/shared.module';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import { demoRoutes } from './demo.routing.module';
import { AppStateComponent } from './samples/app-state/app-state.component';
import { ChangeDetectionProfileComponent } from './samples/change-detection-profile/change-detection-profile.component';
import { ChangeDetectionComponent } from './samples/change-detection/change-detection.component';
import { ChangeDetectorRefComponent } from './samples/change-detector-ref/change-detector-ref.component';
import { DetectorChildComponent } from './samples/change-detector-ref/detector-child/detector-child.component';
import { ComponentStoreComponent } from './samples/component-store/component-store.component';
import { ContainerPresenterNgrxComponent } from './samples/container-presenter-ngrx/container-presenter-ngrx.component';
import { EffectsComponent } from './samples/effects/effects.component';
import { FacadesComponent } from './samples/facades/facades.component';
import { DemoEditComponent } from './samples/feature-module-state/demo-edit/demo-edit.component';
import { DemoFilterComponent } from './samples/feature-module-state/demo-filter/demo-filter.component';
import { DemoListComponent } from './samples/feature-module-state/demo-list/demo-list.component';
import { DemoRowComponent } from './samples/feature-module-state/demo-row/demo-row.component';
import { FeatureModuleStateComponent } from './samples/feature-module-state/feature-module-state.component';
import { NgrxDataComponent } from './samples/ngrx-data/ngrx-data.component';
import { NgrxEntityComponent } from './samples/ngrx-entity/ngrx-entity.component';
import { DemosEffects } from './state/demos.effects';
import { FormattingModule } from '../shared/formatting/formatting.module';
import { NgrxSignalsComponent } from './samples/ngrx-signals/ngrx-signals.component';
import { CreateFeatureComponent } from './samples/create-feature/create-feature.component';
import { DispatchActionComponent } from './samples/dispatch-action/dispatch-action.component';
import { RespondToEffectsComponent } from './samples/respond-to-effects/respond-to-effects.component';
import { demoState } from './state/demos.state';

@NgModule({
  declarations: [
    DemoContainerComponent,
    DemoRowComponent,
    DemoFilterComponent,
    DemoEditComponent,
    DemoListComponent,
    AppStateComponent,
    NgrxEntityComponent,
    FacadesComponent,
    EffectsComponent,
    ChangeDetectionComponent,
    ContainerPresenterNgrxComponent,
    ChangeDetectorRefComponent,
    DetectorChildComponent,
    ChangeDetectionProfileComponent,
    ComponentStoreComponent,
    NgrxDataComponent,
    FeatureModuleStateComponent,
    NgrxEntityComponent,
    NgrxSignalsComponent,
    CreateFeatureComponent,
    DispatchActionComponent,
    RespondToEffectsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(demoRoutes),
    MaterialModule,
    HttpClientModule,
    MarkdownRendererModule,
    SharedModule,
    MarkdownEditorModule,
    FormattingModule,
    StoreModule.forFeature(demoState),
    EffectsModule.forFeature([DemosEffects]),
  ],
  providers: [],
})
export class DemosModule { }
