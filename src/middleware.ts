import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  //TODO: set a consistent name to this
  const isAuth = req.cookies.get('isAuth')

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
