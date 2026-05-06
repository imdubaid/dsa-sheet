import { updateUserProgress } from '@/services/user.service';
import { requestHandler } from '@/utils/helper';

export const updateProgress = requestHandler(async (req, res) => {
    await updateUserProgress(req.body);
    res.status(201);
});
