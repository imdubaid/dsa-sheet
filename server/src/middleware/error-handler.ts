import { NextFunction, Request, Response } from 'express';
import CustomError from '@/lib/custom-error';
import { ZodError } from 'zod';
import { textTransform } from '@/utils/helper';

export default function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log('Handling Error...');
    console.log(err);

    if (err instanceof CustomError) return res.status(err.status).error(err);

    if (err instanceof ZodError) return zodError(err, res);

    if (err instanceof Error) return res.status(400).error(err);

    return error500(res);
}

function error500(res: Response) {
    return res.status(500).error({ name: 'Unknown Error', message: 'Something went wrong' });
}

function zodError(err: ZodError, res: Response) {
    const issue = err.issues.shift();
    const name = err.name;

    if (!issue) return res.status(400).error({ name, message: 'Invalid Request' });

    return res.status(400).error({
        name,
        field: issue.path.join('.'),
        message: issue.message,
    });
}
