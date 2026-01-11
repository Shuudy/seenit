const TOKEN_KEY = 'seenit_access_token';

export function getToken(): string | null {
  // eslint-disable-next-line unicorn/no-null, unicorn/prefer-global-this
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
