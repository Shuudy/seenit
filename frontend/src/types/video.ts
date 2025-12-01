import { User } from './user';
import { Comment } from './comment';

export type VideoData = {
  id: number;
  title: string;
  user: User;
  channel: string;
  channelSubscribers: string;
  views: string;
  likes: number;
  comments: number;
  uploadedAt: string;
  description: string;
  file: File | null;
  thumbnail: string;
  videoComments: Comment[];
};
