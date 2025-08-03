import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const sessionCookie = req.cookies.get('session')?.value;

  if (sessionCookie && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!sessionCookie) {
  console.log('Middleware check failed');
    return NextResponse.redirect(new URL('/login', req.url));
  }
  console.log('Middleware check success');
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/snippet/:path*', '/logout'], // Protect these routes
};
