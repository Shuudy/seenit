import { getXsrfToken } from '@/utils/csrf';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function apiClient<T>(path: string, config: RequestInit = {}): Promise<T> {
  const url = `${BASE_API_URL}/api${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(config.headers as Record<string, string>),
  };

  // Add XSRF token header for mutations only
  if (config.method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method)) {
    const xsrfToken = getXsrfToken();
    if (xsrfToken) {
      headers['X-XSRF-TOKEN'] = xsrfToken;
    }
  }

  const options: RequestInit = {
    ...config,
    headers,
    cache: 'no-store',
    credentials: 'include', // Needed for Sanctum SPA authentication
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as Promise<T>;
}
