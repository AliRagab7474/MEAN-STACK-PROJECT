import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, User } from '../models/user.model';

const BASE = `${environment.apiUrl}/user`;

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getMyProfile(): Observable<User> {
    return this.http
      .get<ApiResponse<User>>(`${BASE}/profile`)
      .pipe(map((res) => res.data));
  }

  deleteProfile(): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${BASE}/deleteProfile`);
  }

  getShareableLink(): Observable<string> {
    return this.http
      .get<ApiResponse<string>>(`${BASE}/shareProfile`)
      .pipe(map((res) => res.data));
  }

  getSharedProfile(id: string): Observable<Pick<User, '_id' | 'FirstName' | 'LastName' | 'Gender'>> {
  return this.http
    .get<ApiResponse<{ user: Pick<User, '_id' | 'FirstName' | 'LastName' | 'Gender'> }>>(
      `${BASE}/${id}/shareProfile`
    )
    .pipe(map((res) => res.data.user));
}

  getAllUsers(): Observable<User[]> {
    return this.http
      .get<ApiResponse<User[]>>(`${BASE}/getAllUsers`)
      .pipe(map((res) => res.data));
  }

  blockUser(userId: string): Observable<User> {
    return this.http
      .patch<ApiResponse<User>>(`${BASE}/${userId}/blockUser`, {})
      .pipe(map((res) => res.data));
  }

  unblockUser(userId: string): Observable<User> {
    return this.http
      .patch<ApiResponse<User>>(`${BASE}/${userId}/unBlockUser`, {})
      .pipe(map((res) => res.data));
  }
}