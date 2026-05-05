import CustomError from '@/lib/custom-error';
import { UserDocument } from '@/schema/user.schema';
import { fetchUser } from '@/services/user.service';
import { signToken } from '@/utils/helper';

export async function authenticate(data: UserDocument) {
    const { email, password } = data;
    const user = await fetchUser(email);

    if (!user) throw new CustomError(`Sorry, We can't find your account with ${email}.`, 404);

    const isAuthorized = await user.isAuthorized(password);

    if (!isAuthorized) throw new CustomError('Sorry, your password was incorrect. Please double-check your password.', 400);

    user.removeSensitiveInfo();

    const token = signToken(user);

    return { user, token };
}
