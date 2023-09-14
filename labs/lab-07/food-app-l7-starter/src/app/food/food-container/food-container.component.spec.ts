import { MaterialModule } from 'src/app/material.module';
import { FoodContainerComponent } from './food-container.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FoodService } from '../food.service';
import { FoodModule } from '../food.module';
import { foodAddedItem, foodLoadData, foodSingleItem } from '../food.mocks';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('food-list-container', () => {
  //add your setup here
  let component: FoodContainerComponent;
  let spy: any;
  let fixture: ComponentFixture<FoodContainerComponent>;


  beforeEach(() => {
    spy = jasmine.createSpyObj('FoodService', ['getFood', 'deleteFood', 'addFood']);
    spy.getFood.and.returnValue(of(foodLoadData));
    spy.addFood.and.returnValue(of(foodAddedItem));
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule, FoodModule],
      declarations: [FoodContainerComponent],
      providers: [{provide: FoodService, useValue: spy}]
    })
    fixture = TestBed.createComponent(FoodContainerComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  })

  it('should render the food-list.component', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-food-list')).toBeTruthy();
  });

  it('should render the food-edit.component', () => {
    expect(component).toBeTruthy();
    component.selectFood(foodSingleItem);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-food-edit')).toBeTruthy();
  });

  it('should add an empty food when add is clicked', async () => {
    expect(component).toBeTruthy();
    // expect(fixture.nativeElement.querySelector('button').textContent).toEqual("bla");
    // expect(fixture.debugElement.query(By.css('button[innerHtml="Add Food"]')).nativeElement.textContent).toEqual("bla");
  });

  it('should select the correct food item', () => {
    pending();
  });

  it('should save a new food item', (done: DoneFn) => {
    pending();
  });

  it('should update food item', () => {
    pending();
  });

  it('should delete the food item', () => {
    pending();
  });
});
