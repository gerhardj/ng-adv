import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NavItem } from './nav-item.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  http = inject(HttpClient);

  /**
   * getTopItems
   */
  public getTopItems() {
    return this.http.get<NavItem[]>(`${environment.api}/top-links`);
  }
}
