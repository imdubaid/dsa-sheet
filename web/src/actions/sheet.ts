import { getApiClient } from '@/lib/apiClient';
import { getSession } from '@/actions/auth';

export default async function getSheet(sheetName: string) {
    const apiClient = await getApiClient();
    const session = await getSession();

    try {
        const response = await apiClient.get('/sheet', { params: { name: sheetName, user: session?.id } });
        return response.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
