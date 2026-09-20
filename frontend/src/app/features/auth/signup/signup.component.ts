import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { getAuthErrorMessage } from '../auth-error-message';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['../auth-shared.css']
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  signupForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.min(10)]],
    gender: ['', [Validators.required]],
    password: ['', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*.\W).{8,16}$/)
    ]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  isLoading = false;
  errorMessage = '';

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    const { firstName, lastName, ...rest } = this.signupForm.value;
    const payload = { ...rest, fullName: `${firstName} ${lastName}`.trim() };
    this.authService.signup(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.cdr.markForCheck();
        this.router.navigate(['/confirm-email']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = getAuthErrorMessage(err, 'An error occurred during registration. Please try again.', 'signup');
        this.cdr.markForCheck();
      }
    });
  }
}
