import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authRoutes, DEFAULT_ROUTE, routes } from '@/routes';

type JwtPayload = {
    exp?: number;
};

const match = (currentPath: string, paths: string[]) => {
    return paths.some(path => {
        if (path.endsWith('*')) {
            return currentPath.startsWith(path.slice(0, -1));
        }
        return currentPath === path;
    });
};

const decodeTokenPayload = (token: string): JwtPayload | null => {
    try {
        const payloadPart = token.split('.')[1];
        if (!payloadPart) return null;
        const normalized = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = atob(normalized);
        return JSON.parse(decoded) as JwtPayload;
    } catch {
        return null;
    }
};

const isValidToken = (token?: string) => {
    if (!token) return false;
    const payload = decodeTokenPayload(token);
    if (!payload?.exp) return false;
    return payload.exp * 1000 > Date.now();
};

export async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const sessionCookie = req.cookies.get('token')?.value;
    const hasValidSession = isValidToken(sessionCookie);
    const isAuthRoute = match(path, Object.values(authRoutes));
    const isPublicRoute = match(path, [DEFAULT_ROUTE]);

    if (isPublicRoute && hasValidSession) return NextResponse.redirect(new URL(routes.home, req.nextUrl));

    if (!hasValidSession && isPublicRoute) return NextResponse.next();

    if (!hasValidSession && !isAuthRoute) return NextResponse.redirect(new URL(authRoutes.signIn, req.nextUrl));

    return NextResponse.next();
}

// Configure which paths the middleware should run on
/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 * - public folder
 */
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.well-known).*)'],
};
