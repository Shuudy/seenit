export type User = {
  id: number;
  username: string;
  email?: string;
  avatar_url?: string | null;
  handle?: string;
  bio?: string | null;
  subscribers?: string;
  subscribersRaw?: number;
  videos_count?: number;
  banner_url?: string | null;
};
