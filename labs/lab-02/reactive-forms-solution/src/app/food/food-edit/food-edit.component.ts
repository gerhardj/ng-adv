import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FoodItem } from '../food.model';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
  ],
})
export class FoodEditComponent implements OnChanges {
  fb = inject(FormBuilder);
  @Input() food: FoodItem = new FoodItem();
  @Output() onFoodSaved: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();

  foodForm = this.fb.nonNullable.group({
    id: [this.food.id, [Validators.required]],
    name: [this.food.name, [Validators.required, Validators.minLength(3)]],
    price: [this.food.price, [Validators.required, Validators.min(1)]],
    calories: this.food.calories,
  })

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['food']) {
      this.foodForm.setValue(changes['food'].currentValue);
    }
  }

  saveForm(): void {
    console.log('food to save', this.foodForm.value);
    this.onFoodSaved.emit(this.foodForm.value as FoodItem);
  }
}
