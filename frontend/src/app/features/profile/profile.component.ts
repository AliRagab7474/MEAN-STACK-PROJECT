import { Component, inject, signal, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { Message } from '../../core/models/message.model';
import { MessageService } from '../../core/services/message.service';
import { Report } from '../../core/models/report.model';
import { ReportService } from '../../core/services/report.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly hiddenReportsKey = 'sarhne-hidden-reports';
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private reportService = inject(ReportService);

  user = signal<User | null>(null);
  isLoading = signal(true);
  showDeleteConfirm = signal(false);
  copied = signal(false);
  shareError = signal(false);
  reports = signal<Report[]>([]);
  messages = signal<Message[]>([]);
  selectedReport = signal<Report | null>(null);

  ngOnInit(): void {
    this.userService.getMyProfile().subscribe({
      next: (res) => {
        this.user.set(res);
        this.isLoading.set(false);
        this.loadReports(res.role);
      },
      error: () => this.isLoading.set(false),
    });
  }

  private loadReports(role: User['role']): void {
    if (role === 'Admin') {
      this.reportService.getAllReports().subscribe({
        next: (reports) => {
          const hiddenReports = this.getHiddenReports();
          this.reports.set(reports.filter((report) => !hiddenReports.includes(report._id)));
        },
        error: () => this.reports.set([]),
      });
      return;
    }

    this.messageService.getReceivedMessages().subscribe({
      next: (messages) => {
        this.messages.set(messages);
        const messageIds = new Set(messages.map((message) => message._id));
        this.reportService.getMyReports().subscribe({
          next: (reports) => {
            const hiddenReports = this.getHiddenReports();
            this.reports.set(reports.filter((report) =>
              messageIds.has(this.getReportMessageId(report)) && !hiddenReports.includes(report._id)
            ));
          },
          error: () => this.reports.set([]),
        });
      },
      error: () => this.reports.set([]),
    });
  }

  private getReportMessageId(report: Report): string {
    return typeof report.messageId === 'string' ? report.messageId : report.messageId._id;
  }

  private getHiddenReports(): string[] {
    if (typeof localStorage === 'undefined') return [];

    try {
      const value = JSON.parse(localStorage.getItem(this.hiddenReportsKey) || '[]');
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  viewReport(report: Report): void {
    if (this.authService.currentUser()?.role === 'Admin') {
      this.reportService.getReportDetails(report._id).subscribe({
        next: (details) => this.selectedReport.set(details),
        error: () => this.selectedReport.set(report),
      });
      return;
    }
    this.selectedReport.set(report);
  }

  closeReport(): void {
    this.selectedReport.set(null);
  }

  reportedMessageContent(report: Report): string {
    const messageId = this.getReportMessageId(report);
    if (typeof report.messageId !== 'string' && report.messageId.content) {
      return report.messageId.content;
    }
    return this.messages().find((message) => message._id === messageId)?.content || 'Message unavailable';
  }

  shareProfile(): void {
    this.userService.getShareableLink().subscribe({
      next: async (link) => {
        this.shareError.set(false);
        if (navigator.share) {
          try {
            await navigator.share({ title: 'Sarhne', text: 'Send me an anonymous message 👀', url: link });
          } catch {}
        } else {
          await navigator.clipboard.writeText(link);
          this.copied.set(true);
          setTimeout(() => this.copied.set(false), 2000);
        }
      },
      error: () => this.shareError.set(true),
    });
  }

  openDeleteConfirm(): void {
    this.showDeleteConfirm.set(true);
  }

  cancelDelete(): void {
    this.showDeleteConfirm.set(false);
  }

  confirmDelete(): void {
    this.userService.deleteProfile().subscribe({
      next: () => this.authService.logout(),
    });
  }
}