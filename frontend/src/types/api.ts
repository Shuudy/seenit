import { User } from '@/types/user';

export type MetaAPI = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type ApiResponse<T> = {
  data: T;
  meta?: MetaAPI;
};

export type LoginResponse = {
  data: {
    user: User;
    access_token: string;
    token_type: 'Bearer';
  };
};
