import { Types } from 'mongoose';
import { z } from 'zod';

const ObjectId = z.string().refine(val => Types.ObjectId.isValid(val), {
    message: 'Invalid Mongo ObjectId',
});

export const getSheetDto = z.object({
    name: z.string().min(1),
    user: ObjectId,
});

export type GetSheetType = z.infer<typeof getSheetDto>;
