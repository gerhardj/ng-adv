import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodItem } from '../food.model';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-food-edit',
    templateUrl: './food-edit.component.html',
    styleUrls: ['./food-edit.component.scss'],
    standalone: true,
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
    ],
})
export class FoodEditComponent {
  @Input() food = new FoodItem();
  @Output() onFoodSaved: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();

  saveFood() {
    console.log('food to save', this.food);
    this.onFoodSaved.emit(this.food);
  }
}
