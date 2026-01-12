const TOKEN_COOKIE = 'seenit_auth';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getCookieValue(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;

  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (const cookie of cookies) {
    const index = cookie.indexOf('=');
    if (index === -1) continue;
    const key = cookie.slice(0, index);
    if (key !== name) continue;
    return decodeURIComponent(cookie.slice(index + 1));
  }

  return undefined;
}

function setCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;

  const isProduction = process.env.NODE_ENV === 'production';
  //eslint-disable-next-line unicorn/no-document-cookie
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax${isProduction ? '; Secure' : ''}`;
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') return;
  //eslint-disable-next-line unicorn/no-document-cookie
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function getToken(): string | undefined {
  return getCookieValue(TOKEN_COOKIE);
}

export function setToken(token: string) {
  setCookie(TOKEN_COOKIE, token);
}

export function clearToken() {
  deleteCookie(TOKEN_COOKIE);
}
