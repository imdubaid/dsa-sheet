import { getApiClient } from '@/lib/apiClient';
import errorHandler from '@/utils/errors/main';

type Response = {
    data: Record<string, unknown> | null;
    error: string | null;
};

export async function signIn(email: string, password: string): Promise<Response> {
    const apiClient = await getApiClient();

    try {
        const response = await apiClient.post('/auth/login', {
            email,
            password,
        });

        return {
            data: response.data.data,
            error: null,
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
            error: errorHandler.handle(error),
        };
    }
}

export async function createAccount(name: string, email: string, password: string): Promise<Response> {
    const apiClient = await getApiClient();
    try {
        await apiClient.post('/auth/register', { name, email, password });

        return {
            data: null,
            error: null,
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
            error: errorHandler.handle(error),
        };
    }
}
