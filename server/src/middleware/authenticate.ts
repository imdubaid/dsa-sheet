import { Handler } from 'express';
import Jwt from 'jsonwebtoken';
import CustomError from '@/lib/custom-error';
import { Types } from 'mongoose';

const authenticate: Handler = function authenticate(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) throw new CustomError('Session token must be provided', 400);

        const token = authorization.split(' ')[1];

        if (typeof token !== 'string') throw new CustomError('Provided Auth token is invalid', 400);

        if (!token) throw new CustomError('JWT must be provided', 401);

        const user = Jwt.verify(token, process.env.JWT_SECRET!) as any;
        req.user = user;

        if (user.id) {
            req.user._id = new Types.ObjectId(user.id);
        }

        next();
    } catch (err: any) {
        console.log(err);
        res.status(401).error(err.message || 'Unauthorized access');
    }
};

export default authenticate;
