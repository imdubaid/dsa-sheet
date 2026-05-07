import axios from 'axios';

export async function getApiClient(sessionCookie?: string) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (sessionCookie) {
        headers.authorization = `Bearer ${sessionCookie}`;
    }

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
        headers,
    });
}
