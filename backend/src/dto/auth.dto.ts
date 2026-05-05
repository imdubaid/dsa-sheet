import { z } from 'zod';

export const registerDto = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Email is required'),
    password: z.string().min(6),
});

export const loginDto = z.object({
    email: z.email('Email is required'),
    password: z.string().min(6),
});
