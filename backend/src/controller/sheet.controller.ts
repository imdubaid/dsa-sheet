import { fetchSheet } from '@/services/sheet.service';
import { requestHandler } from '@/utils/helper';

export const getSheet = requestHandler(async (req, res) => {
    const name = req.query.name as string;
    const data = await fetchSheet(name);
    res.success(data);
});
