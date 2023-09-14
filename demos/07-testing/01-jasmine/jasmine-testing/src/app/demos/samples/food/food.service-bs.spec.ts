import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FoodServiceBS } from './food.service-bs';
import { environment } from '../../../../environments/environment.prod';

describe('Service - HttpTest -FoodService', () => {
  let service: FoodServiceBS;
  let controller: HttpTestingController;
  let data: any[] = [];

  beforeEach(() => {
    (data = [
      { id: 1, name: 'Pad Thai', rating: 5 },
      { id: 2, name: 'Butter Chicken', rating: 5 },
    ]),

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [FoodServiceBS],
      });

    service = TestBed.inject(FoodServiceBS);
    controller = TestBed.inject(HttpTestingController);
    // setup the service mock
    const url = `${environment.apiUrl}food`;
    const req = controller.expectOne(url);
    expect(req.request.method).toEqual('GET');
    // flushing down mock data
    req.flush(data);
  });

  // Verify that there are no pending HTTP requests
  afterEach(() => {
    controller.verify();
  });

  it('should be created and correctly setup', () => {
    expect(service).toBeTruthy();
    service.getFood().subscribe((items) => {
      expect(items).toBe(data);
    });
  });

  it('should return initialized the data', (done) => {
    service.getFood().subscribe((items) => {
      expect(items.length).toEqual(2);
      done();
    });
  });

  it('should create a post in an array', (done) => {
    service.addFood({ id: 3, name: 'Cannelloni', rating: 4 },);

    service.getFood().subscribe((items) => {
      expect(items.length).toEqual(3);
      done();
    });
  });

  it('should return the correct amount of items', (done) => {
    service.addFood({ id: 1, name: 'Pad Thai', rating: 5 });
    service.addFood({ id: 2, name: 'Butter Chicken', rating: 5 });

    service.getFood().subscribe((items) => {
      expect(items.length).toEqual(4);
      expect(items[1].name).toEqual('Butter Chicken');
      done();
    });
  });

  it('should have the correct number of items after delete', (done) => {
    service.deleteFood({ id: 1, name: 'Pad Thai', rating: 5 });

    service.getFood().subscribe((items) => {
      expect(items.length).toEqual(1);
      expect(items).toEqual([{ id: 2, name: 'Butter Chicken', rating: 5 }]);
      done();
    });
  });
});
