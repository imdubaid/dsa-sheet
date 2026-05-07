import axios from 'axios';

export async function getApiClient(sessionCookie?: string) {
    const baseURL =
        typeof window === 'undefined' ? (process.env.SERVER_INTERNAL_URL ?? process.env.NEXT_PUBLIC_SERVER_URL) : process.env.NEXT_PUBLIC_SERVER_URL;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (sessionCookie) {
        headers.authorization = `Bearer ${sessionCookie}`;
    }

    return axios.create({
        baseURL,
        headers,
    });
}
