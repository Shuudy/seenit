import { User } from '@/types/user';

export type VideoData = {
  title: string;
  description: string;
  file: File | undefined;
};

export type Video = {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
  url: string;
  duration: number;
  count_views: number;
  likes_count: number;
  user: User;
  created_at: string;
  updated_at: string;
};
