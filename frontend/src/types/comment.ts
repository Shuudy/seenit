import { User } from './user';

export type Comment = {
  id: number;
  content: string;
  user: User;
  likes_count: number;
  is_liked_by_current_user: boolean;
  created_at: string;
};
