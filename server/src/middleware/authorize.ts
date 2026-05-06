import { Handler } from 'express';
import CustomError from '@/lib/custom-error';

const authorize: Handler = (req, res, next) => {
    const authKey = req.headers.authorization;

    if (!authKey || authKey !== process.env.API_KEY) {
        throw new CustomError('Access Denied: A valid API key is required to proceed.', 401);
    }
    next();
};

export default authorize;
