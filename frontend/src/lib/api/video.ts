import { ApiResponse, MetaAPI } from '@/types/api';
import { apiClient } from '@/lib/api-client';
import { Video } from '@/types/video';
import { Comment } from '@/types/comment';

export async function getVideos(): Promise<Video[]> {
  const response = await apiClient<ApiResponse<Video[]>>('/videos');
  return response.data;
}

export async function getVideo(videoId: string): Promise<Video> {
  const response = await apiClient<ApiResponse<Video>>(`/videos/${videoId}`);
  return response.data;
}

export async function getRecommendedVideos(videoId: string): Promise<Video[]> {
  const response = await apiClient<ApiResponse<Video[]>>(`/videos/${videoId}/recommendations`);
  return response.data;
}

export async function getVideoComments(
  videoId: string
): Promise<{ comments: Comment[]; meta: MetaAPI }> {
  const response = await apiClient<ApiResponse<Comment[]>>(`/videos/${videoId}/comments`);
  return {
    comments: response.data ?? [],
    meta: response.meta ?? {},
  };
}

export async function postComment(videoId: string, content: string): Promise<Comment> {
  const response = await apiClient<ApiResponse<Comment>>(`/videos/${videoId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
  return response.data;
}
