import { apiClient } from '@/lib/api-client';
import { ApiResponse } from '@/types/api';
import { User } from '@/types/user';
import { Video } from '@/types/video';

export async function getUser(userId: string): Promise<User> {
  const response = await apiClient<ApiResponse<User>>(`/users/${userId}`);
  return response.data;
}

export async function getUserVideos(userId: string): Promise<Video[]> {
  const response = await apiClient<ApiResponse<Video[]>>(`/users/${userId}/videos`);
  return response.data;
}
