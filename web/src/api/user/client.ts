'use client';

import { getApiClient } from '@/lib/apiClient';
import { getSession, getSessionCookie } from '@/actions/session/client';

export async function updateUserProgress(problemId: string, status: string) {
    const sessionCookie = getSessionCookie();
    const session = getSession(sessionCookie);
    if (!session || !sessionCookie) return [];

    const apiClient = await getApiClient(sessionCookie);

    try {
        await apiClient.post('/user/progress', {
            user: session?.id,
            problem: problemId,
            status: status,
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}
