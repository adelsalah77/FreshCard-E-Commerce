import { resetCodeData, resetNewPasswordData } from './../../../shared/models/data';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { forgetPasswordData, logInData, signUpData } from '../../../shared/models/data';
import { Observable } from 'rxjs';
import { Environment } from '../../../../environment/environment';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router: Router = inject(Router);

  userData: WritableSignal<null | JwtPayload> = signal<null | JwtPayload>(null);

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) ID: object,
  ) {
    if (isPlatformBrowser(ID)) {
      if (localStorage.getItem('userToken')) {
        this.decodeUserData();
      }
    }
  }

  signUp(Data: signUpData): Observable<any> {
    return this.httpClient.post(`${Environment.baseUrl}/api/v1/auth/signup`, Data);
  }

  logIn(Data: logInData): Observable<any> {
    return this.httpClient.post(`${Environment.baseUrl}/api/v1/auth/signin`, Data);
  }

  decodeUserData() {
    const token = localStorage.getItem('userToken')!;
    const decoded = jwtDecode(token);
    this.userData.set(decoded);

    console.log(this.userData(), 'user data');
  }

  logOut() {
    // remove token from local storage
    localStorage.removeItem('userToken');
    // reset user data
    this.userData.set(null);
    // navigate to login page or home page
    this.router.navigate(['/login']);
  }

  forgetPassword(data: forgetPasswordData): Observable<any> {
    return this.httpClient.post(`${Environment.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }

  verifyResetCode(data: resetCodeData): Observable<any> {
    return this.httpClient.post(`${Environment.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }

  resetNewPassword(data: resetNewPasswordData): Observable<any> {
    return this.httpClient.put(`${Environment.baseUrl}/api/v1/auth/resetPassword`, data);
  }
}
