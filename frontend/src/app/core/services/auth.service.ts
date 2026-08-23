import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, switchMap, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginPayload, LoginResponse, User } from '../models/user.model';
import { UserService } from './user.service';

const TOKEN_KEY = 'sarhne_token';
const BASE = `${environment.apiUrl}/auth`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private userService = inject(UserService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  currentUser = signal<User | null>(null);

  login(payload: LoginPayload): Observable<User> {
    return this.http.post<LoginResponse>(`${BASE}/login`, payload).pipe(
      tap((res) => this.setToken(res.data)),
      switchMap(() => this.userService.getMyProfile()),
      tap((user) => this.currentUser.set(user))
    );
  }

  loadCurrentUser(): Observable<User | null> {
    if (!this.getToken()) return of(null);
    return this.userService.getMyProfile().pipe(tap((user) => this.currentUser.set(user)));
  }

  logout(): void {
    this.removeToken();
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    if (this.isBrowser) localStorage.setItem(TOKEN_KEY, token);
  }

  private removeToken(): void {
    if (this.isBrowser) localStorage.removeItem(TOKEN_KEY);
  }
}