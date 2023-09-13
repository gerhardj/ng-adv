import { NgModule } from '@angular/core';
import { SplitComponent } from './controls/split/split.component';
import {MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
  declarations: [
    SplitComponent
  ],
  imports: [
    MatToolbarModule
  ],
  exports: [
    SplitComponent
  ]
})
export class UxControlsModule { }
