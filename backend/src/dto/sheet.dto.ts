import { z } from 'zod';

export const getSheetDto = z.object({
    name: z.string().min(1),
});
