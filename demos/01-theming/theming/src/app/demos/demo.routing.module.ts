import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import { CardComponent } from './samples/card/card.component';
import { ContentProjectionComponent } from './samples/content-projection/content-projection.component';
import { PopupContainerComponent } from './samples/popup-container/popup-container.component';
import { TableComponent } from './samples/table/table.component';
import { StyleInheritanceComponent } from './samples/style-inheritance/style-inheritance.component';
import { MaterialVsBootstrapComponent } from './samples/material-vs-bootstrap/material-vs-bootstrap.component';
import { MultiThemeComponent } from './samples/multi-theme/multi-theme.component';
import { VisualFeedbackComponent } from './samples/visual-feedback/visual-feedback.component';
import { MdcMigrationComponent } from './samples/mdc-migration/mdc-migration.component';

const demoRoutes: Routes = [
  {
    path: '',
    component: DemoContainerComponent,
    children: [
      { path: 'style-inheritance', component: StyleInheritanceComponent },
      { path: 'table', component: TableComponent },
      { path: 'card', component: CardComponent },
      { path: 'projection', component: ContentProjectionComponent },
      { path: 'mat-overrides', component: PopupContainerComponent },
      { path: 'bootstrap', component: MaterialVsBootstrapComponent },
      { path: 'multi-theme', component: MultiThemeComponent },
      { path: 'feedback', component: VisualFeedbackComponent },
      { path: 'mdc-migration', component: MdcMigrationComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(demoRoutes)],
  exports: [RouterModule],
})
export class DemoRoutingModule { }
