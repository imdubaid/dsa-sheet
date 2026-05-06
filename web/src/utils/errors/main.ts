import { ErrorHandler as ErrorHandlerType } from '@/types/types';
import { AxiosErrorHandler, DefaultErrorHandler } from './handlers';

export class ErrorHandler {
    private handlers: ErrorHandlerType[] = [];

    register(handler: ErrorHandlerType) {
        this.handlers.push(handler);
    }

    handle(error: unknown, fallback = 'Something went wrong'): string {
        console.error(error);

        for (const handler of this.handlers) {
            if (handler.canHandle(error)) {
                const message = handler.handle(error);
                if (message) return message;
            }
        }

        return fallback;
    }
}

const errorHandler = new ErrorHandler();

errorHandler.register(new AxiosErrorHandler());
errorHandler.register(new DefaultErrorHandler());

export default errorHandler;
