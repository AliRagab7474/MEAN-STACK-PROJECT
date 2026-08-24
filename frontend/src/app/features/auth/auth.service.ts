import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SignupRequest,
  LoginRequest,
  ConfirmEmailRequest,
  ForgetPasswordRequest,
  ResetPasswordRequest
} from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  // الـ Proxy سيحول /auth تلقائياً إلى http://localhost:3000/auth
  private baseUrl = '/auth';

  signup(data: SignupRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  confirmEmail(data: ConfirmEmailRequest): Observable<any> {
    return this.http.patch(`${this.baseUrl}/confirm-email`, data);
  }

  forgetPassword(data: ForgetPasswordRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/forget-password`, data);
  }

  resetPassword(data: ResetPasswordRequest): Observable<any> {
    return this.http.patch(`${this.baseUrl}/reset-password`, data);
  }
}
