import express from 'express';
import { login, register } from '@/controller/auth.controller';
import { validate } from '@/middleware/validate';
import { registerDto } from '@/dto/auth.dto';

const auth = express.Router();

// POST
auth.post('/login', login);
auth.post('/register', validate(registerDto), register);

export default auth;
