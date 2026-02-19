import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private httpClient: HttpClient = inject(HttpClient);

  getAllCategories():Observable<any> {
    return this.httpClient.get(`${Environment.baseUrl}/api/v1/categories`);
  }
}
