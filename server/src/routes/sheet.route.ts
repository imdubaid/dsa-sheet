import express from 'express';
import { validate } from '@/middleware/validate';
import { getSheetDto } from '@/dto/sheet.dto';
import { getSheet } from '@/controller/sheet.controller';

const sheet = express.Router();

// GET
sheet.get('/', validate(getSheetDto, ['query']), getSheet);

export default sheet;
