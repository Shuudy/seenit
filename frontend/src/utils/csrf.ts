export function getXsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;

  const cookie = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));

  if (!cookie) return undefined;

  const token = cookie.split('=')[1];
  return decodeURIComponent(token);
}
