import { type NextRequest, NextResponse } from 'next/server'
import { getCookie } from 'cookies-next/server'

const publicRoutes = ['/login', '/register']

export async function proxy(req: NextRequest) {
    const res = NextResponse.next()
    const token = await getCookie('token', { req, res })
    const { pathname } = req.nextUrl

    const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route)
    )

    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
