import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { ConfirmEmailComponent } from './features/auth/confirm-email/confirm-email.component';
import { ForgetPasswordComponent } from './features/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';
import { ProfileComponent } from './features/profile/profile.component';
import { HomeComponent } from './features/pages/home/home.component';
import { UsersListComponent } from './features/admin/users-list/users-list.component';
import { SendMessageComponent } from './features/send-message/send-message.component';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [guestGuard] },
  { path: 'confirm-email', component: ConfirmEmailComponent, canActivate: [guestGuard] },
  { path: 'forget-password', component: ForgetPasswordComponent, canActivate: [guestGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [guestGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'admin/users', component: UsersListComponent, canActivate: [authGuard, adminGuard] },
  { path: 'u/:email', component: SendMessageComponent },
  { path: '**', redirectTo: 'dashboard' }
];

