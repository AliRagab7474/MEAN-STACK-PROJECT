import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  private userService = inject(UserService);

  shareLink = signal<string | null>(null);
  copied = signal(false);

  ngOnInit(): void {
    if (!this.authService.currentUser()) {
      this.authService.loadCurrentUser().subscribe(() => this.buildShareLink());
    } else {
      this.buildShareLink();
    }
  }

  private buildShareLink(): void {
    this.userService.getShareableLink().subscribe({
      next: () => {
        const email = this.authService.currentUser()?.email;
        if (email) {
          this.shareLink.set(`${window.location.origin}/u/${email}`);
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