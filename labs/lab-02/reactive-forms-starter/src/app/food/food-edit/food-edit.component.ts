import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FoodItem } from '../food.model';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-food-edit',
    templateUrl: './food-edit.component.html',
    styleUrls: ['./food-edit.component.scss'],
    standalone: true,
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        CommonModule
    ],
})
export class FoodEditComponent implements OnChanges, OnInit {
  ngOnInit(): void {
    this.foodForm.patchValue(this.food);
  }
  @Input({ required: true }) food = new FoodItem();
  @Output() onFoodSaved: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();

  private fb = inject(FormBuilder);

  foodForm = this.fb.nonNullable.group({
    id: [0],
    name: ['', Validators.minLength(3)],
    price: [0, Validators.min(1)],
    calories: [0]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['food']) {
      this.foodForm.setValue(changes['food'].currentValue);
    }
  }

  saveFood() {
    console.log('food to save', this.food, this.foodForm.value, this.foodForm.getRawValue());
    this.onFoodSaved.emit(this.foodForm.value as FoodItem);
  }
}
