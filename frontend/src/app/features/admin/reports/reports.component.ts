import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Report, ReportUserReference } from '../../../core/models/report.model';
import { ReportService } from '../../../core/services/report.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {
  private readonly reportDescriptionsKey = 'sarhne-report-descriptions';
  private reportService = inject(ReportService);
  reports = signal<Report[]>([]);
  selectedReport = signal<Report | null>(null);
  isLoading = signal(true);
  processingId = signal<string | null>(null);

  ngOnInit(): void {
    this.reportService.getAllReports().subscribe({
      next: (reports) => {
        this.reports.set(reports.map((report) => this.withSavedDescription(report)));
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  messageContent(report: Report): string {
    return typeof report.messageId === 'string' ? 'Message unavailable' : report.messageId.content || 'Message unavailable';
  }

  reporterName(report: Report): string {
    if (!report.reportedBy || typeof report.reportedBy === 'string') return 'Unknown user';
    const user = report.reportedBy as ReportUserReference;
    return `${user.FirstName || ''} ${user.LastName || ''}`.trim() || user.email || 'Unknown user';
  }

  senderEmail(report: Report): string | null {
    if (!report.senderId || typeof report.senderId === 'string') return null;
    return report.senderId.email ?? null;
  }

  senderStatus(report: Report): string {
    if (!report.senderId || typeof report.senderId === 'string') return '';
    return report.senderId.status ?? '';
  }

  private withSavedDescription(report: Report): Report {
    if (report.description) return report;
    return { ...report, description: this.getSavedReportDescriptions()[report._id] || '' };
  }

  private getSavedReportDescriptions(): Record<string, string> {
    if (typeof localStorage === 'undefined') return {};
    try {
      const value = JSON.parse(localStorage.getItem(this.reportDescriptionsKey) || '{}');
      return value && typeof value === 'object' ? value : {};
    } catch {
      return {};
    }
  }

  viewDetails(report: Report): void {
    this.selectedReport.set(report);
    this.reportService.getReportDetails(report._id).subscribe({
      next: (details) => this.selectedReport.set(details),
    });
  }

  closeDetails(): void { this.selectedReport.set(null); }

  resolve(report: Report, action: 'message deleted' | 'sender banned' | 'dismissed'): void {
  this.processingId.set(report._id);

  const request$ =
    action === 'dismissed'
      ? this.reportService.dismissReport(report._id)
      : this.reportService.resolveReport(report._id, action);

  request$.subscribe({
    next: (updated) => {
      this.reports.update((list) => list.map((item) => (item._id === updated._id ? updated : item)));
      this.processingId.set(null);
      this.selectedReport.set(null);
    },
    error: () => this.processingId.set(null),
  });
}
}