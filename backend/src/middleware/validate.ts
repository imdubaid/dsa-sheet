import { ZodType } from 'zod';
import { RequestHandler } from 'express';
import { requestHandler } from '@/utils/helper';

export const validate = (schema: ZodType<any>): RequestHandler =>
    requestHandler(async (req, _res, next) => {
        req.body = schema.parse(req.body);
        next();
    });
