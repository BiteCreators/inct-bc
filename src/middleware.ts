import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const isAuth = req.cookies.get('accessToken')

  if (req.url.includes('/auth/sign-in') || req.url.includes('/auth/sign-up')) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', req.url))
    } else {
      return NextResponse.next()
    }
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url))
  }

  return NextResponse.next()
}

export const config = {
  //all protected routes should go after '/auth/sing-up'
  matcher: ['/auth/sign-in', '/auth/sign-up', '/create'],
}
