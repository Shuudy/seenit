import { LoginCredentials, ProfileUpdate, RegisterCredentials, User } from '@/types/auth';
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

export async function login(credentials: LoginCredentials): Promise<User> {
  await getCsrfCookie();

  const response = await apiClient<ApiResponse<User>>('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  return response.data;
}

export async function register(credentials: RegisterCredentials): Promise<User> {
  await getCsrfCookie();

  const response = await apiClient<ApiResponse<User>>('/register', {
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

export async function updateProfile(data: ProfileUpdate): Promise<User> {
  await getCsrfCookie();

  const response = await apiClient<ApiResponse<User>>('/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  return response.data;
}

export async function updateProfileImages(data: { avatar?: File; banner?: File }): Promise<User> {
  await getCsrfCookie();

  const formData = new FormData();
  if (data.avatar) {
    formData.append('avatar', data.avatar);
  }
  if (data.banner) {
    formData.append('banner', data.banner);
  }

  const response = await apiClient<ApiResponse<User>>('/me/images', {
    method: 'POST',
    body: formData,
  });

  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await apiClient<ApiResponse<User>>('/me');
  return response.data;
}
