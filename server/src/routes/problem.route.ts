import express from 'express';
import { validate } from '@/middleware/validate';
import { ProblemQueryDto } from '@/dto/problem.dto';
import { getProblemBySheet } from '@/controller/problem.controller';

const problem = express.Router();

// GET
problem.get('/', validate(ProblemQueryDto, ['query']), getProblemBySheet);

export default problem;
