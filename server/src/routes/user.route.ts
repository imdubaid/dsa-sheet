import express from 'express';
import { updateProgress } from '@/controller/user.controller';
import { validate } from '@/middleware/validate';
import { updateUserProgressDto } from '@/dto/user.dto';

const user = express.Router();

// POST
user.post('/progress', validate(updateUserProgressDto, ['body']), updateProgress);

export default user;
