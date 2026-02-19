import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { AllproductsResponse, Product } from '../../../shared/models/Iproducts';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<AllproductsResponse> {
    return this.httpClient.get<AllproductsResponse>(`${Environment.baseUrl}/api/v1/products`);
  }

  getspasificProduct(productId: string): Observable<{ data: Product }> {
    return this.httpClient.get<{ data: Product }>(
      `${Environment.baseUrl}/api/v1/products/${productId}`,
    );
  }
}
