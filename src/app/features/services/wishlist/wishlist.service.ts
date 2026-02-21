import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private http = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  
  private getHeaders(): HttpHeaders {
    let token = '';

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('userToken') || '';
    }

    return new HttpHeaders({
      token: token,
    });
  }

 
  getWishlist(): Observable<any> {
    return this.http.get(`${Environment.baseUrl}/api/v1/wishlist`, {
      headers: this.getHeaders(),
    });
  }

 
  addToWishlist(productId: string): Observable<any> {
    return this.http.post(
      `${Environment.baseUrl}/api/v1/wishlist`,
      { productId },
      { headers: this.getHeaders() },
    );
  }

 
  removeFromWishlist(productId: string): Observable<any> {
    return this.http.delete(`${Environment.baseUrl}/api/v1/wishlist/${productId}`, {
      headers: this.getHeaders(),
    });
  }
}
