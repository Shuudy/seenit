const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export async function apiClient<T>(path: string): Promise<T> {
  const url = `${BASE_API_URL}${path}`;

  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as Promise<T>;
}
