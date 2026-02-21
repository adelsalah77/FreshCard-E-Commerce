import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../environment/environment';
import { ShippingAddresData } from '../../../shared/models/Icart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpClient: HttpClient = inject(HttpClient);

  creatCashOrder(cartId: string, data: ShippingAddresData): Observable<any> {
    return this.httpClient.post(
      `${Environment.baseUrl}/api/v1/orders/${cartId}`,
      {
        shippingAddress: data,
      },
      
    );
  }

  checkOut(cartId: string, data: ShippingAddresData): Observable<any> {
    return this.httpClient.post(
      `${Environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${Environment.domin}`,
      {
        shippingAddress: data,
      },
      
    );
  }
}
