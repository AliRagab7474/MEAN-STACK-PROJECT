import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { MessageService } from '../../../core/services/message.service';
import { Message } from '../../../core/models/message.model';
import { Report } from '../../../core/models/report.model';
import { ReportService } from '../../../core/services/report.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, DatePipe, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})

export class DashboardComponent implements OnInit {
  private readonly hiddenReportsKey = 'sarhne-hidden-reports';
  authService = inject(AuthService);
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private reportService = inject(ReportService);

  shareLink = signal<string | null>(null);
  copied = signal(false);

  messages = signal<Message[]>([]);
  isLoadingMessages = signal(true);
  deletingId = signal<string | null>(null);
  reports = signal<Report[]>([]);
  isLoadingReports = signal(true);
  reportingId = signal<string | null>(null);
  reportError = signal<string | null>(null);
  reportDescriptions = signal<Record<string, string>>({});

  ngOnInit(): void {
    if (!this.authService.currentUser()) {
      this.authService.loadCurrentUser().subscribe(() => this.buildShareLink());
    } else {
      this.buildShareLink();
    }
    this.loadMessages();
    this.loadReports();
  }

  private loadReports(revealMessageId?: string): void {
    this.reportService.getMyReports().subscribe({
      next: (reports) => {
        let hiddenReports = this.getHiddenReports();

        if (revealMessageId) {
          const revealedReport = reports.find((report) => this.reportMatchesMessage(report, revealMessageId));
          if (revealedReport) {
            hiddenReports = hiddenReports.filter((id) => id !== revealedReport._id);
            localStorage.setItem(this.hiddenReportsKey, JSON.stringify(hiddenReports));
          }
        }

        this.reports.set(reports.filter((report) => !hiddenReports.includes(report._id)));
        this.isLoadingReports.set(false);
      },
      error: () => this.isLoadingReports.set(false),
    });
  }

  private loadMessages(): void {
    this.messageService.getReceivedMessages().subscribe({
      next: (msgs) => {
        this.messages.set(msgs);
        this.isLoadingMessages.set(false);
      },
      error: () => this.isLoadingMessages.set(false),
    });
  }

  deleteMessage(id: string): void {
    this.deletingId.set(id);
    this.messageService.deleteMessage(id).subscribe({
      next: () => {
        this.messages.update((list) => list.filter((m) => m._id !== id));
        this.reports.update((list) => list.filter((report) => !this.reportMatchesMessage(report, id)));
        this.deletingId.set(null);
      },
      error: () => this.deletingId.set(null),
    });
  }

  reportMessage(messageId: string, description = ''): void {
    if (this.isReported(messageId) || this.reportingId()) return;
    this.reportError.set(null);
    this.reportingId.set(messageId);
    this.reportService.reportMessage(messageId, 'spam', description).subscribe({
      next: (report) => {
        this.reports.update((list) => [...list, report]);
        const hiddenReports = this.getHiddenReports().filter((id) => id !== report._id);
        localStorage.setItem(this.hiddenReportsKey, JSON.stringify(hiddenReports));
        this.reportingId.set(null);
      },
      error: (error) => {
        this.reportingId.set(null);
        const message = error?.error?.errorMessage || error?.error?.message || 'Could not report this message.';
        if (message.toLowerCase().includes('already done report')) {
          this.loadReports(messageId);
          this.reportError.set(null);
          return;
        }
        this.reportError.set(message);
      },
    });
  }

  setReportDescription(messageId: string, description: string): void {
    this.reportDescriptions.update((descriptions) => ({ ...descriptions, [messageId]: description }));
  }

  unreport(report: Report): void {
    this.reports.update((list) => list.filter((item) => item._id !== report._id));
    const hiddenReports = this.getHiddenReports();
    if (!hiddenReports.includes(report._id)) {
      localStorage.setItem(this.hiddenReportsKey, JSON.stringify([...hiddenReports, report._id]));
    }
  }

  private getHiddenReports(): string[] {
    try {
      const value = JSON.parse(localStorage.getItem(this.hiddenReportsKey) || '[]');
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  isReported(messageId: string): boolean {
    return this.reports().some((report) => this.reportMatchesMessage(report, messageId));
  }

  private reportMatchesMessage(report: Report, messageId: string): boolean {
    return typeof report.messageId === 'string' ? report.messageId === messageId : report.messageId._id === messageId;
  }

  reportedMessageContent(report: Report): string {
    const messageId = typeof report.messageId === 'string' ? report.messageId : report.messageId._id;
    return this.messages().find((message) => message._id === messageId)?.content || 'Message unavailable';
  }

  private buildShareLink(): void {
    this.userService.getShareableLink().subscribe({
      next: () => {
        const id = this.authService.currentUser()?._id;
        if (id) {
          this.shareLink.set(`${window.location.origin}/u/${id}`);
        }
      },
      error: () => {},
    });
  }

  copyLink(): void {
    const link = this.shareLink();
    if (!link) return;
    navigator.clipboard.writeText(link).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  logout(): void {
    this.authService.logout();
  }
}