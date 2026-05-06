import express from 'express';
import { login, register } from '@/controller/auth.controller';
import { validate } from '@/middleware/validate';
import { loginDto, registerDto } from '@/dto/auth.dto';

const auth = express.Router();

// POST
auth.post('/login', validate(loginDto, ['body']), login);
auth.post('/register', validate(registerDto, ['body']), register);

export default auth;
