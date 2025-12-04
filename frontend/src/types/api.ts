export type MetaAPI = {
  [key: string]: any;
};

export type ApiResponse<T> = {
  data: T;
  meta?: MetaAPI;
};
