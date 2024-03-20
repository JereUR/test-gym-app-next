import { NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard']

export default async function Middleware(req) {
  const session = true
  const isDashboardRoute = req.nextUrl.pathname.match(/^\/dashboard/)

  if (
    !session &&
    (protectedRoutes.includes(req.nextUrl.pathname) || isDashboardRoute)
  ) {
    const absoluteURL = new URL('/login', req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
}
