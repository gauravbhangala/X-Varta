import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Get the pathname
  const { pathname } = req.nextUrl

  // List of public routes
  const publicRoutes = ['/auth/login', '/auth/signup']

  // List of protected routes (dashboard)
  const protectedRoutes = ['/', '/projects', '/team', '/reports', '/settings']

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'))

  if (isProtectedRoute) {
    // Check if user has a session cookie
    // This is handled by the useAuth hook in the layout
    // The middleware just allows the request to proceed
  }

  // For now, allow all requests to proceed
  // Auth is handled by the useAuth hook on the client side
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

