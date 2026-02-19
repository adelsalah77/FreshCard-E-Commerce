import { CheckPlateFormService } from './../../../shared/services/checkPlateForm/check-plate-form.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { cartResponse } from '../../../shared/models/Icart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  noOfCartItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  checkPlateFormService: CheckPlateFormService = inject(CheckPlateFormService);

  httpclient: HttpClient = inject(HttpClient);

  constructor() {
    if (this.checkPlateFormService.checkIsPlateFormBrowser()) {
      this.getLoggedUserCart().subscribe({
        next: (res) => {
          this.noOfCartItems.next(res.numOfCartItems);
          console.log(this.noOfCartItems.getValue);
        },
      });
    }
  }

  addproducttoCart(productId: string): Observable<any> {
    return this.httpclient.post(
      `${Environment.baseUrl}/api/v1/cart`,
      {
        productId: productId,
      },
      {
        headers: {
          token: localStorage.getItem('userToken')!,
        },
      },
    );
  }

  getLoggedUserCart(): Observable<cartResponse> {
    return this.httpclient.get<cartResponse>(`${Environment.baseUrl}/api/v1/cart`, {
      headers: {
        token: localStorage.getItem('userToken') || '',
      },
    });
  }

  updateProductCartCount(procuctId: string, count: string): Observable<cartResponse> {
    return this.httpclient.put<cartResponse>(`${Environment.baseUrl}/api/v1/cart/${procuctId}`, {
      count: count,
      headers: {
        token: localStorage.getItem('userToken') || '',
      },
    });
  }

  removeSpecificProductFromCart(procuctId: string): Observable<cartResponse> {
    return this.httpclient.delete<cartResponse>(`${Environment.baseUrl}/api/v1/cart/${procuctId}`, {
      headers: {
        token: localStorage.getItem('userToken') || '',
      },
    });
  }

  clearCart(): Observable<any> {
    return this.httpclient.delete(`${Environment.baseUrl}/api/v1/cart`, {
      headers: {
        token: localStorage.getItem('userToken') || '',
      },
    });
  }
}
