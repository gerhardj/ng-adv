- Examine `food/food.service.ts` and `food/food.service.spec.ts` and its http injection and the use of HttpClientTestingModule and HttpTestingController.

- Http-tests can be used to test the service and the http calls, especially when the service is doing some processing on the data like in getAvailableFood().

```typescript
@Injectable({
  providedIn: 'root',
})
export class FoodService {
  http = inject(HttpClient);

  getFood() {
    return this.http.get<FoodItem[]>(`${environment.apiUrl}food`)
  }
```