// middleware/authMiddleware.js
import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareSupabaseClient } from './app/services/supabase' // Importa el cliente de Supabase
import { NextApiResponse, NextApiRequest } from 'next'

const protectedRoutes = ['/dashboard']

export default async function Middleware(req: NextRequest, res: NextResponse) {
  const supabase = createMiddlewareSupabaseClient({ req })
  const { data } = await supabase.auth.getSession()
  const { session } = data
  const isDashboardRoute = req.nextUrl.pathname.match(/^\/dashboard/)
  /* 
  if (
    !session &&
    (protectedRoutes.includes(req.nextUrl.pathname) || isDashboardRoute)
  ) {
    const absoluteURL = new URL('/login', req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  } */
}
