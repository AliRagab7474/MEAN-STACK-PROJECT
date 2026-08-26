import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/user.model';
import { Message } from '../models/message.model';

const BASE = `${environment.apiUrl}/message`;

@Injectable({ providedIn: 'root' })
export class MessageService {
  private http = inject(HttpClient);

 
  sendMessage(receiverId: string, content: string): Observable<{ receiver: string; content: string }> {
    return this.http
      .post<ApiResponse<{ receiver: string; content: string }>>(
        `${BASE}/${receiverId}/send-message`,
        { content }
      )
      .pipe(map((res) => res.data));
  }

  
  getReceivedMessages(): Observable<Message[]> {
    return this.http
      .get<ApiResponse<Message[]>>(`${BASE}/received-messages`)
      .pipe(
        map((res) => res.data),
        catchError(() => of([])) 
      );
  }

  
  deleteMessage(messageId: string): Observable<void> {
    return this.http.delete<void>(`${BASE}/${messageId}/delete-message`);
  }
}