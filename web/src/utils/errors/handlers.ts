import { ErrorHandler } from '@/types/types';
import { AxiosError } from 'axios';
import { extractErrorMessage } from './helpers';

export class DefaultErrorHandler implements ErrorHandler {
    canHandle(error: unknown): boolean {
        return error instanceof Error;
    }

    handle(error: unknown): string | null {
        return (error as Error).message || null;
    }
}

export class AxiosErrorHandler implements ErrorHandler {
    canHandle(error: unknown): boolean {
        return error instanceof AxiosError;
    }

    handle(error: unknown): string | null {
        const err = error as AxiosError;

        // Prefer backend message
        const serverMessage = extractErrorMessage(err.response?.data);
        if (serverMessage) return serverMessage;

        // Fallback to native axios message
        if (err.message) return err.message;

        // Network case
        if (err.request) {
            return 'Network error. Please check your connection.';
        }

        return null;
    }
}
