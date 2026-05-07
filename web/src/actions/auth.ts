import { getApiClient } from '@/lib/apiClient';
import errorHandler from '@/utils/errors/main';

type Response = {
    data: Record<string, unknown>;
    error: boolean;
    message: string;
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
            error: false,
            message: 'Login successful',
        };
    } catch (error) {
        console.error(error);
        return {
            data: {},
            error: true,
            message: errorHandler.handle(error),
        };
    }
}

export async function createAccount(name: string, email: string, password: string): Promise<Response> {
    const apiClient = await getApiClient();
    try {
        await apiClient.post('/auth/register', { name, email, password });

        return {
            data: {},
            error: false,
            message: 'Account created successfully! Please sign in to continue.',
        };
    } catch (error) {
        console.error(error);
        return {
            data: {},
            error: true,
            message: errorHandler.handle(error),
        };
    }
}
