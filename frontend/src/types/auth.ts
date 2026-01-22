export type User = {
  id: number;
  username: string;
  email: string;
  email_verified_at: string | null;
  bio: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  created_at: string;
  updated_at: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type AuthResponse = {
  user: User;
};
