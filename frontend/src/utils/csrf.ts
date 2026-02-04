import Cookies from 'js-cookie';

export function getXsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;

  return Cookies.get('XSRF-TOKEN');
}
