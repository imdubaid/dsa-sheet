import { GetSheetType } from '@/dto/sheet.dto';
import { fetchSheet } from '@/services/sheet.service';
import { requestHandler } from '@/utils/helper';
import { Types } from 'mongoose';

export const getSheet = requestHandler(async (req, res) => {
    const { name, user } = req.query as GetSheetType;
    const userId = new Types.ObjectId(user);

    const data = await fetchSheet(name, userId);
    res.success(data);
});
