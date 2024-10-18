import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const isAuth = req.cookies.get('accessToken')?.value

  if (
    req.nextUrl.pathname === '/auth/sign-in' ||
    req.nextUrl.pathname === '/auth/sign-up' ||
    req.nextUrl.pathname === '/auth/google'
  ) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', req.url))
    } else {
      return NextResponse.next()
    }
  }
  if (req.nextUrl.pathname === '/' && req.nextUrl.searchParams.has('code')) {
    return NextResponse.redirect(new URL(`/auth/google${req.nextUrl.search}`, req.url))
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url))
  }

  return NextResponse.next()
}

export const config = {
  //all protected routes should go after '/auth/sing-up'
  matcher: ['/auth/sign-in', '/auth/sign-up', '/auth/google', '/create', '/', '/profile/:path*'],
}
