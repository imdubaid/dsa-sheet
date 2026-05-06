import { ZodType } from 'zod';
import { RequestHandler } from 'express';
import { requestHandler } from '@/utils/helper';

type RequestFields = 'body' | 'query';

export const validate = (schema: ZodType<any>, requestFields: RequestFields[]): RequestHandler =>
    requestHandler(async (req, _res, next) => {
        requestFields.forEach(field => {
            const parsed = schema.parse(req[field]);

            Object.assign(req[field], parsed);
        });
        next();
    });
