const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function apiClient<T>(
  path: string,
  options?: Omit<RequestInit, 'headers'> & { headers?: Record<string, string> }
): Promise<T> {
  const url = `${BASE_API_URL}${path}`;

  const requestOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    cache: options?.cache ?? 'no-store',
  };
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as Promise<T>;
}
