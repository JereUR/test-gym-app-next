import { NextResponse } from 'next/server'

import { sessionStatus } from './app/utils/session'

const protectedRoutes = ['/dashboard']

export default function Middleware(req: any) {
  const isDashboardRoute = req.nextUrl.pathname.match(/^\/dashboard/)
  if (
    !sessionStatus &&
    (protectedRoutes.includes(req.nextUrl.pathname) || isDashboardRoute)
  ) {
    const absoluteURL = new URL('/login', req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
}
