export interface VideoCardProps {
  id: number;
  thumbnail?: string;
  title: string;
  channel?: string;
  views: string;
  uploadedAt: string;
}

export interface CommentProps {
  username: string;
  avatarLetter: string;
  daysAgo: number;
  content: string;
}
