import express from 'express';
import { userInfo } from '@/controller/user.controller';

const user = express.Router();

// POST
user.post('/info', userInfo);

export default user;
