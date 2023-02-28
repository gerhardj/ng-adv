import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FoodItem } from './food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private httpClient: HttpClient) {
    this.initData();
  }

  private items: FoodItem[] = [];
  private Items: BehaviorSubject<FoodItem[]> = new BehaviorSubject(this.items);

  initData() {
    this.httpClient
      .get<FoodItem[]>(`${environment.apiUrl}food`)
      .subscribe((data) => {
        this.setState(data);
      });
  }

  private setState(data: any) {
    this.items = data;
    this.Items.next(this.items);
  }

  getItems() {
    return this.httpClient.get<FoodItem[]>(`${environment.apiUrl}food`)
  }

  deleteItem(item: FoodItem) {
    return this.httpClient.delete(`${environment.apiUrl}food/${item.id}`)
  }

  addItem(item: FoodItem) {
    return this.httpClient.put<FoodItem>(`${environment.apiUrl}food`, item)
  }
}
