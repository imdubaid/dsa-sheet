import { getStoredToken } from '@/utils/token';
import axios from 'axios';

export async function getApiClient() {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    const token = getStoredToken();

    if (token && token.trim()) {
        headers.authorization = `Bearer ${token}`;
    }

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers,
    });
}
