import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { AllproductsResponse, Product } from '../../../shared/models/Iproducts';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productService: any;
  productlist: any;
  currentPage: any;
  numberOfPages: any;
  constructor(private httpClient: HttpClient) {}

  getAllProducts(page: number = 1): Observable<any> {
    return this.httpClient.get(`${Environment.baseUrl}/api/v1/products?page=${page}&limit=20`);
  }

  getspasificProduct(productId: string): Observable<{ data: Product }> {
    return this.httpClient.get<{ data: Product }>(
      `${Environment.baseUrl}/api/v1/products/${productId}`,
    );
  }
}
