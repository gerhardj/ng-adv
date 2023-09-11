import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FoodContainerComponent } from './food-container/food-container.component';
import { FoodEditComponent } from './food-edit/food-edit.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodRoutingModule } from './food-routing.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FoodRoutingModule,
    FoodContainerComponent,
    FoodListComponent,
    FoodEditComponent
]
})
export class FoodModule { }
