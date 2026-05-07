import { getApiClient } from '@/lib/apiClient';
import { getSession, getSessionCookie } from '@/actions/session/server';

export async function getProblem(sheetName: string) {
    const sessionCookie = await getSessionCookie();
    const session = await getSession(sessionCookie);
    if (!session || !sessionCookie) return [];

    const apiClient = await getApiClient(sessionCookie);

    try {
        const response = await apiClient.get('/problem', { params: { name: sheetName, user: session.id } });
        return response.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
