import { SessionUser } from '@/types/types';
import { isSessionExpired } from '@/utils/helper';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

const TOKEN_KEY = 'token';

export async function getSessionCookie(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_KEY);
    if (!token?.value) return null;

    return String(token.value);
}

export async function getSession(cookie: string | null): Promise<SessionUser | null> {
    if (!cookie) return null;

    const decoded = jwtDecode(cookie) as SessionUser;
    if (!decoded || isSessionExpired(decoded)) return null;
    return decoded;
}
