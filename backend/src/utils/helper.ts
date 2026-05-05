import { UserDocument } from '@/schema/user.schema';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const requestHandler = (fn: AsyncHandler): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const signToken = (user: UserDocument) => jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET!);
