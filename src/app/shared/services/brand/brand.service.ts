import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private http = inject(HttpClient);

  getAllBrands(): Observable<any> {
    return this.http.get(`${Environment.baseUrl}/api/v1/brands`);
  }

  getBrandById(id: string): Observable<any> {
    return this.http.get(`${Environment.baseUrl}/api/v1/brands/${id}`);
  }
}
