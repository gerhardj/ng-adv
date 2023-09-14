import { environment } from 'src/environments/environment';
import { FoodItem } from './food.model';
import { FoodService } from './food.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing';
import { foodAddItem, foodAddedItem, foodAddedResult, foodDeleteItem, foodDeleteResult, foodLoadData, foodUpdateItem, foodUpdatedItem } from './food.mocks';

describe('FoodService', () => {
  //add your setup here
  let service: FoodService;

  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FoodService]
    });

    service = TestBed.inject(FoodService);
    controller = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    controller.verify();
  });

  it('should return the initial load data', () => {
    service.getFood().subscribe((items) => {
      expect(items).toBeTruthy();
      expect(items.length).toBe(4);
    })

    const url = `${environment.api}food`;
    const req = controller.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(foodLoadData);
  });

  it('should create a new food item', () => {
    service.addFood(foodAddItem).subscribe((items) => {
      expect(items).toBeTruthy();
      expect(items.name).toEqual('Gulasch');
    })

    const url = `${environment.api}food`;
    const req = controller.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(foodAddedItem);
  });

  it('should update a food item', () => {
    service.updateFood(foodUpdateItem).subscribe((items) => {
      expect(items).toBeTruthy();
      expect(items.name).toEqual('Gulyas');
    })

    const url = `${environment.api}food/${foodUpdateItem.id}`;
    const req = controller.expectOne(url);
    expect(req.request.method).toEqual('PUT');
    req.flush(foodUpdatedItem);
  });

  it('should delete a food item', () => {
    service.deleteFood(foodDeleteItem.id).subscribe((items) => {
      expect(items).toBeTruthy();
      expect(items.length).toEqual(3);
    })

    const url = `${environment.api}food/${foodDeleteItem.id}`;
    const req = controller.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush(foodDeleteResult);
  });
});
