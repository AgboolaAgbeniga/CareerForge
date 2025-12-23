import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    // If no token and trying to access protected routes, redirect to login
    if (pathname.startsWith('/job-seeker/dashboard') || pathname.startsWith('/recruiter/')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
  }

  // For now, since we can't easily check user data in middleware, we'll handle redirects in components
  // But we can add basic checks here if needed

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/job-seeker/dashboard/:path*',
    '/recruiter/:path*',
    '/api/:path*',
  ],
};