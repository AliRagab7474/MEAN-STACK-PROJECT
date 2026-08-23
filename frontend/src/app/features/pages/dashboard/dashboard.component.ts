import { Component, inject, OnInit } from '@angular/core';
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

  copied = false;

  ngOnInit(): void {
   
    if (!this.authService.currentUser()) {
      this.authService.loadCurrentUser().subscribe();
    }
  }

  copyShareLink(): void {
    this.userService.getShareableLink().subscribe({
      next: async (link) => {
        await navigator.clipboard.writeText(link);
        this.copied = true;
        setTimeout(() => (this.copied = false), 2000);
      },
    });
  }
}