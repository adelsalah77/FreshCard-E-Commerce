import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CheckPlateFormService } from './../../../shared/services/checkPlateForm/check-plate-form.service';
import { Environment } from '../../../../environment/environment';
import { Product } from '../../../shared/models/Iproducts';
import { cartResponse } from '../../../shared/models/Icart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  noOfCartItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private cartProducts: Product[] = [];

  checkPlateFormService: CheckPlateFormService = inject(CheckPlateFormService);
  httpclient: HttpClient = inject(HttpClient);

  constructor() {
    if (this.checkPlateFormService.checkIsPlateFormBrowser()) {
      this.getLoggedUserCart().subscribe({
        next: (res) => {
          this.noOfCartItems.next(res.numOfCartItems);
        },
      });
    }
  }

  getCartProducts(): Product[] {
    return this.cartProducts.length
      ? this.cartProducts
      : JSON.parse(localStorage.getItem('cartProducts') || '[]');
  }

  setCartProducts(products: Product[]) {
    this.cartProducts = products;
    this.noOfCartItems.next(products.length);
    localStorage.setItem('cartProducts', JSON.stringify(products));
  }

  clearLocalCart() {
    this.cartProducts = [];
    this.noOfCartItems.next(0);
    localStorage.removeItem('cartProducts');
  }

  addproducttoCart(productId: string) {
    return this.httpclient.post(
      `${Environment.baseUrl}/api/v1/cart`,
      { productId },
      { headers: { token: localStorage.getItem('userToken')! } }
    );
  }

  getLoggedUserCart() {
    return this.httpclient.get<cartResponse>(`${Environment.baseUrl}/api/v1/cart`, {
     
    });
  }

  updateProductCartCount(productId: string, count: string) {
    return this.httpclient.put<cartResponse>(
      `${Environment.baseUrl}/api/v1/cart/${productId}`,
      { count },
      
    );
  }

  removeSpecificProductFromCart(productId: string) {
    return this.httpclient.delete<cartResponse>(
      `${Environment.baseUrl}/api/v1/cart/${productId}`,
     
    );
  }

  clearCart() {
    return this.httpclient.delete(`${Environment.baseUrl}/api/v1/cart`, {
      
    });
  }
}