import User, { IUser } from '@/schema/user.schema';

export async function createUser(data: IUser) {
    const newUser = new User({
        name: data.name,
        email: data.email,
        password: data.password,
    });

    await newUser.save();
    const user = newUser.removeSensitiveInfo();
    return user;
}

export async function fetchUser(email: IUser['email']) {
    return await User.findOne({ email });
}
