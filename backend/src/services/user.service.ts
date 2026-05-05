import User, { UserDocument } from '@/schema/user.schema';

export async function createUser(data: UserDocument) {
    const newUser = new User({
        name: data.name,
        email: data.email,
        password: data.password,
    });

    await newUser.save();
    const user = newUser.removeSensitiveInfo();
    return user;
}

export async function fetchUser(email: UserDocument['email']) {
    return await User.findOne({ email });
}
