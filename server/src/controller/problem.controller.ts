import { ProblemQueryType } from '@/dto/problem.dto';
import { fetchProblem } from '@/services/problem.service';
import { requestHandler } from '@/utils/helper';
import { Types } from 'mongoose';

export const getProblemBySheet = requestHandler(async (req, res) => {
    const { name, user } = req.query as ProblemQueryType;
    const userId = new Types.ObjectId(user);

    const data = await fetchProblem(name, userId);
    res.success(data);
});
