import { ApiResponse } from '@/types/api';
import { apiClient } from '@/lib/api-client';
import { Video } from '@/types/video';

export async function getVideos(): Promise<Video[]> {
  const res = await apiClient<ApiResponse<Video[]>>('/videos/');
  return res.data;
}

export async function getVideo(videoId: string): Promise<Video> {
  const res = await apiClient<ApiResponse<Video>>(`/videos/${videoId}/`);
  return res.data;
}