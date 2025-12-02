import { ApiResponse } from '@/types/api';
import { apiClient } from './api-client';
import { Video } from '@/types/video';

export async function getVideos(): Promise<Video[]> {
  const res = await apiClient<ApiResponse<Video[]>>('/videos/');
  return res.data;
}
