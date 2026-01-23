import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? 'seenit-session';

export async function fetchMeIfAuthenticated() {
  const cookieStore = await cookies();

  const apiSession = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!apiSession) return;

  const cookieHeader = `${SESSION_COOKIE_NAME}=${apiSession}`;

  const origin = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
    headers: {
      Cookie: cookieHeader,
      Accept: 'application/json',
      Origin: origin,
    },
    cache: 'no-store',
  });

  if (response.status === 401) return;
  if (!response.ok) throw new Error('Failed to fetch user');

  const json = await response.json();
  return json.data;
}
