import { authenticate } from '@/services/auth.service';
import { createUser } from '@/services/user.service';
import { requestHandler } from '@/utils/helper';

export const login = requestHandler(async (req, res) => {
    const data = await authenticate(req.body);
    res.success(data);
});

export const register = requestHandler(async (req, res) => {
    const data = await createUser(req.body);
    res.success(data);
});
