import { problemStatus } from '@/types/constants';
import mongoose from 'mongoose';
import { z } from 'zod';

const ObjectId = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid Mongo ObjectId',
});

export const updateUserProgressDto = z.object({
    user: ObjectId,
    problem: ObjectId,
    status: z.enum(problemStatus),
});
