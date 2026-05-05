import { authenticate } from '@/services/auth.service';
import { createUser } from '@/services/user.service';
import { requestHandler } from '@/utils/helper';

export const login = requestHandler(async (req, res) => {
    const { token, user } = await authenticate(req.body);

    res.success({
        message: 'Successfully Logged In',
        token,
        user,
    });
});

export const register = requestHandler(async (req, res) => {
    const user = await createUser(req.body);

    res.success({
        message: 'user created',
        user,
    });
});
