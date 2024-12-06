import { NextRequest, NextResponse } from 'next/server'

import { hostMiddleware } from './application/middleware'

const adminMiddleware = (req: NextRequest) => {
  const isAuth = req.cookies.get('adminAccessToken')?.value

  if (req.nextUrl.pathname === '/admin/auth/sign-in') {
    if (isAuth) {
      return NextResponse.redirect(new URL('/admin/users', req.url))
    } else {
      return NextResponse.next()
    }
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL('/admin/auth/sign-in', req.url))
  }

  if (req.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/users', req.url))
  }
}

export default function middleware(req: NextRequest) {
  if (req.url.includes('/admin')) {
    return adminMiddleware(req)
  }

  return hostMiddleware(req)
}

export const config = {
  //all protected routes should go after '/auth/sing-up'
  matcher: [
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/google',
    '/create',
    '/',
    '/profile/:id/settings',
    '/admin/:path*',
  ],
}
