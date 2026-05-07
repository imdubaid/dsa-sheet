import UserProgress, { IUserProgress } from '@/schema/userProgress';
import User, { IUser } from '@/schema/user';

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

export async function updateUserProgress(payload: IUserProgress) {
    await UserProgress.findOneAndUpdate(
        {
            user: payload.user,
            problem: payload.problem,
        },
        {
            $set: {
                status: payload.status,
            },
        },
        {
            upsert: true,
            new: true,
        },
    );
}
