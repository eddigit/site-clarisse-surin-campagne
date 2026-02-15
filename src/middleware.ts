import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mode maintenance - mettre à false pour désactiver
const MAINTENANCE_MODE = true

export function middleware(request: NextRequest) {
  // Si mode maintenance activé, rediriger vers /maintenance
  if (MAINTENANCE_MODE) {
    // Ne pas rediriger si déjà sur /maintenance ou assets
    const path = request.nextUrl.pathname
    if (path === '/maintenance' || path.startsWith('/_next') || path.includes('.')) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/maintenance', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
