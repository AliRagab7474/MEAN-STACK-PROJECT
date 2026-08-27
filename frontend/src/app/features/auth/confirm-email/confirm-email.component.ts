import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './confirm-email.component.html',
  styleUrls: ['../auth-shared.css']
})
export class ConfirmEmailComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  confirmForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    otp: ['', [Validators.required]]
  });

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  onSubmit() {
    if (this.confirmForm.invalid) {
      this.confirmForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.confirmEmail(this.confirmForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Email confirmed successfully! Redirecting to login...';
        this.cdr.markForCheck();
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || err.error?.errorMessage || 'Invalid OTP or an error occurred.';
        this.cdr.markForCheck();
      }
    });
  }
}
