import { decodeToken, TOKEN_KEY } from '@/utils/token';
import { cookies } from 'next/headers';

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_KEY);
    if (!token?.value) return null;

    return decodeToken(token.value);
}
