export default class CustomError extends Error {
    status: number;

    constructor(message: string, code?: number) {
        super(message);
        this.name = 'CustomError';
        this.status = code || 400;

        Object.defineProperty(this, 'message', {
            enumerable: true,
        });
    }
}
