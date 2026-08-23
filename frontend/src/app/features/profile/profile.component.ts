import { Component, inject, signal, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);

  user = signal<User | null>(null);
  isLoading = signal(true);
  showDeleteConfirm = signal(false);
  copied = signal(false);
  shareError = signal(false);

  ngOnInit(): void {
    this.userService.getMyProfile().subscribe({
      next: (res) => {
        this.user.set(res);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  shareProfile(): void {
    this.userService.getShareableLink().subscribe({
      next: async (link) => {
        this.shareError.set(false);
        if (navigator.share) {
          try {
            await navigator.share({ title: 'صارحني', text: 'ابعتلي رسالة سرية 👀', url: link });
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