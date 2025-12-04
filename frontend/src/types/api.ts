export type MetaAPI = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type ApiResponse<T> = {
  data: T;
  meta?: MetaAPI;
};
