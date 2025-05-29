import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.module';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/menus';
  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl);
  }
  constructor() {}
}
