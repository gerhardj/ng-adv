- Examine `food/food.service-bs.ts` and `food/food.service--bs.spec.ts` and its http injection and the use of HttpClientTestingModule and HttpTestingController.

- It represents a stateful service that is using a behavior subject to store the data and expose it to the components.


```typescript
@Injectable({
  providedIn: 'root',
})
export class FoodServiceBS {
  http = inject(HttpClient);

  constructor() {
    this.http
      .get<FoodItem[]>(`${environment.apiUrl}food`)
      .subscribe((data) => {
        this.food.next(data);
      });
  }

  food: BehaviorSubject<FoodItem[]> = new BehaviorSubject<FoodItem[]>([]);
```