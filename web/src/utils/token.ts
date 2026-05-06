import { SessionUser } from '@/types/types';
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client';
import { jwtDecode } from 'jwt-decode';

export const TOKEN_KEY = 'token';

export function decodeToken(token: string | undefined): SessionUser | null {
    if (!token) return null;
    try {
        return jwtDecode(token) as SessionUser;
    } catch {
        return null;
    }
}

export const getStoredToken = () => {
    const cookieValue = getCookie(TOKEN_KEY);
    if (!cookieValue) return null;
    return String(cookieValue);
};

export const setStoredToken = (token: string) => {
    setCookie(TOKEN_KEY, token, {
        path: '/',
        sameSite: 'lax',
        secure: typeof window !== 'undefined' ? window.location.protocol === 'https:' : true,
    });
};

export const clearStoredToken = () => {
    deleteCookie(TOKEN_KEY, { path: '/' });
};

export const isTokenExpired = (payload: SessionUser | null) => {
    if (!payload?.exp) return true;
    return payload.exp * 1000 <= Date.now();
};
