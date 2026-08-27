import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { MessageService } from '../../core/services/message.service';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css',
})
export class SendMessageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  authService = inject(AuthService);

  receiverId = '';
  receiverName = signal<string | null>(null);
  isLoading = signal(true);
  notFound = signal(false);

  content = '';
  readonly maxLength = 500;

  isSending = signal(false);
  sent = signal(false);
  errorMsg = signal<string | null>(null);

  ngOnInit(): void {
    this.receiverId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.receiverId) {
      this.notFound.set(true);
      this.isLoading.set(false);
      return;
    }

    this.userService.getSharedProfile(this.receiverId).subscribe({
      next: (user) => {
        this.receiverName.set(`${user.FirstName} ${user.LastName}`);
        this.isLoading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.isLoading.set(false);
      },
    });
  }

  get remaining(): number {
    return this.maxLength - this.content.length;
  }

  submit(): void {
    if (!this.content.trim() || this.content.length < 2) return;

    this.isSending.set(true);
    this.errorMsg.set(null);

    this.messageService.sendMessage(this.receiverId, this.content.trim()).subscribe({
      next: () => {
        this.isSending.set(false);
        this.sent.set(true);
        this.content = '';
      },
      error: (err) => {
        this.isSending.set(false);
        this.errorMsg.set(err?.error?.message ?? 'Could not send your message right now.');
      },
    });
  }
}