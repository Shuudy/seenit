import { ApiResponse, MetaAPI } from '@/types/api';
import { apiClient } from '@/lib/api-client';
import { Video } from '@/types/video';
import { Comment } from '@/types/comment';

export async function getVideos(): Promise<Video[]> {
  const res = await apiClient<ApiResponse<Video[]>>('/videos');
  return res.data;
}

export async function getVideo(videoId: string): Promise<Video> {
  const res = await apiClient<ApiResponse<Video>>(`/videos/${videoId}`);
  return res.data;
}

export async function getRecommendedVideos(videoId: string): Promise<Video[]> {
  const res = await apiClient<ApiResponse<Video[]>>(`/videos/${videoId}/recommendations`);
  return res.data;
}

export async function getVideoComments(
  videoId: string
): Promise<{ comments: Comment[]; meta: MetaAPI }> {
  const res = await apiClient<ApiResponse<Comment[]>>(`/videos/${videoId}/comments`);
  return {
    comments: res.data ?? [],
    meta: res.meta ?? {},
  };
}
