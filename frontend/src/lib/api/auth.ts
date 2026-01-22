import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@/types/auth';
import { apiClient } from '@/lib/api-client';
import { ApiResponse } from '@/types/api';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function getCsrfCookie(): Promise<void> {
  await fetch(`${BASE_API_URL}/sanctum/csrf-cookie`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  await getCsrfCookie();

  const response = await apiClient<ApiResponse<AuthResponse>>('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  return response.data;
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  await getCsrfCookie();

  const response = await apiClient<ApiResponse<AuthResponse>>('/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  return response.data;
}

export async function logout(): Promise<void> {
  await apiClient('/logout', {
    method: 'DELETE',
  });
}

export async function getCurrentUser(): Promise<User> {
  const response = await apiClient<ApiResponse<User>>('/me');
  return response.data;
}
