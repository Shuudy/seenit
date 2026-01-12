import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE = 'seenit_auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';

    const redirectTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    url.searchParams.set('redirect', redirectTo);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
