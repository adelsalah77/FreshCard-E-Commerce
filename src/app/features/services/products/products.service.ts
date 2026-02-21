import { Injectable } from '@angular/core';
import { Environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/Iproducts';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(`${Environment.baseUrl}/api/v1/products`);
  }

  getspasificProduct(productId: string): Observable<{ data: Product }> {
    return this.httpClient.get<{ data: Product }>(
      `${Environment.baseUrl}/api/v1/products/${productId}`,
    );
  }
}
