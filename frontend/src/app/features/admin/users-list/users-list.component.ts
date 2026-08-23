import { Component, inject, signal, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  private userService = inject(UserService);

  users = signal<User[]>([]);
  isLoading = signal(true);
  processingId = signal<string | null>(null);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users.set(res);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  toggleBlock(user: User): void {
    this.processingId.set(user._id);
    const isCurrentlyBlocked = user.status === 'Blocked';
    const action$ = isCurrentlyBlocked
      ? this.userService.unblockUser(user._id)
      : this.userService.blockUser(user._id);

    action$.subscribe({
      next: (updatedUser) => {
        this.users.update((list) =>
          list.map((u) => (u._id === updatedUser._id ? updatedUser : u))
        );
        this.processingId.set(null);
      },
      error: () => this.processingId.set(null),
    });
  }
}