import { Document, Model, model, Schema } from 'mongoose';
import { compareSync, hashSync } from 'bcrypt';
import validator from 'validator';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;

    isAuthorized(password: string): Promise<boolean>;
    hash(password: string): Promise<string>;
    removeSensitiveInfo(): Partial<IUser>;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 40,
            required: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: (value: string) => validator.isEmail(value),
                message: 'Please provide a valid email address',
            },
        },

        password: {
            type: String,
            minlength: 6,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    },
);

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await this.hash(this.password);
    }
});

userSchema.methods.isAuthorized = async function (password: string): Promise<boolean> {
    return compareSync(password, this.password);
};

userSchema.methods.hash = async function (password: string): Promise<string> {
    return hashSync(password, 10);
};

userSchema.methods.removeSensitiveInfo = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
