import { z } from 'zod';

export const registerDto = z.object({
    name: z.string('Name is required').min(3, 'Name must contains at least 3 letters'),
    email: z.email('Please enter a valid email address.'),
    password: z.string('Password is required').min(6, 'Password must contains at least 6 characters'),
});

export const loginDto = z.object({
    email: z.email('Please enter a valid email address.'),
    password: z.string('Password is required').min(6, 'Password must contains at least 6 characters'),
});
