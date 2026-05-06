import { Document, model, Schema } from 'mongoose';
import { compareSync, hashSync } from 'bcrypt';
import validator from 'validator';

interface Methods {
    isAuthorized(password: string): Promise<boolean>;
    hash(password: string): string;
    removeSensitiveInfo(): object;
    signAccessToken(): string;
    signRefreshToken(): string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserDocument extends Document, Methods {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema(
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
    { timestamps: true, toJSON: { virtuals: true } },
);

userSchema.pre('save', async function (this: UserDocument) {
    if (this.isModified('password')) {
        this.password = await this.hash(this.password);
    }
});

userSchema.methods = {
    isAuthorized: async function (password: string) {
        return Boolean(compareSync(password, this.password));
    },

    hash: async function (password: string) {
        return hashSync(password, 10);
    },

    removeSensitiveInfo: function () {
        var obj = this.toObject();
        obj.password = undefined;
        return obj;
    },
};

export default model<UserDocument>('User', userSchema);
