export type UserRole = 'User' | 'Admin';
export type UserStatus = 'Active' | 'Blocked';
export type UserGender = 'Male' | 'Female';

export interface User {
  _id: string;
  FirstName: string;
  LastName: string;
  fullName?: string;
  email: string;
  phone?: string;
  Gender?: UserGender;
  age?: number;
  role: UserRole;
  status: UserStatus;
  ConfirmEmail?: boolean;
  createdAt?: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type LoginResponse = ApiResponse<string>;