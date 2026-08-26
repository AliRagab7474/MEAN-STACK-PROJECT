import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { MessageService } from '../../../core/services/message.service';
import { Message } from '../../../core/models/message.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})

export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  private userService = inject(UserService);
  private messageService = inject(MessageService);

  shareLink = signal<string | null>(null);
  copied = signal(false);

  messages = signal<Message[]>([]);
  isLoadingMessages = signal(true);
  deletingId = signal<string | null>(null);

  ngOnInit(): void {
    if (!this.authService.currentUser()) {
      this.authService.loadCurrentUser().subscribe(() => this.buildShareLink());
    } else {
      this.buildShareLink();
    }
    this.loadMessages();
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
        this.deletingId.set(null);
      },
      error: () => this.deletingId.set(null),
    });
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