'use client';

import { SessionUser } from '@/types/types';
import { isSessionExpired } from '@/utils/helper';
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';

export const getSessionCookie = () => {
    const cookieValue = getCookie(TOKEN_KEY);
    if (!cookieValue) return null;
    return String(cookieValue);
};

export const setSessionCookie = (token: string) => {
    setCookie(TOKEN_KEY, token, {
        path: '/',
        sameSite: 'lax',
        secure: typeof window !== 'undefined' ? window.location.protocol === 'https:' : true,
    });
};

export const clearSessionCookie = () => {
    deleteCookie(TOKEN_KEY, { path: '/' });
};

export const getSession = (cookie: string | null): SessionUser | null => {
    if (!cookie) return null;

    const decoded = jwtDecode(cookie) as SessionUser;
    if (!decoded || isSessionExpired(decoded)) return null;
    return decoded;
};
