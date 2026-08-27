import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/user.model';
import { Report, ReportReason } from '../models/report.model';

const BASE = `${environment.apiUrl}/report`;

@Injectable({ providedIn: 'root' })
export class ReportService {
  private http = inject(HttpClient);

  getMyReports(): Observable<Report[]> {
    return this.http.get<ApiResponse<Report[]>>(`${BASE}/get-my-reports`).pipe(map((res) => res.data));
  }

  getAllReports(): Observable<Report[]> {
    return this.http.get<ApiResponse<Report[]>>(`${BASE}/all-reports`).pipe(map((res) => res.data));
  }

  getReportDetails(reportId: string): Observable<Report> {
    return this.http
      .get<ApiResponse<Report>>(`${BASE}/${reportId}/get-report-details`)
      .pipe(map((res) => res.data));
  }

  reportMessage(messageId: string, reason: ReportReason, description = ''): Observable<Report> {
    return this.http
      .post<ApiResponse<Report>>(`${BASE}/${messageId}/report-message`, { reason, description })
      .pipe(map((res) => res.data));
  }

  updateReport(reportId: string, actionTaken: 'message deleted' | 'sender banned' | 'dismissed'): Observable<Report> {
    return this.http
      .patch<ApiResponse<Report>>(`${BASE}/${reportId}/report-patch`, { actionTaken })
      .pipe(map((res) => res.data));
  }
}
