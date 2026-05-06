import { problemStatus } from '@/types/constants';
import { Document, Model, model, Schema, Types } from 'mongoose';

export interface IUserProgress extends Document {
    user: Types.ObjectId;
    sheet: Types.ObjectId;

    status: (typeof problemStatus)[number];
    notes?: string;
    revisionCount: number;
    lastAttemptedAt?: Date;
    completedAt?: Date;
}

const userProgressSchema = new Schema<IUserProgress>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        sheet: {
            type: Schema.Types.ObjectId,
            ref: 'Sheet',
            required: true,
        },

        status: {
            type: String,
            enum: problemStatus,
            default: 'pending',
        },

        notes: {
            type: String,
            trim: true,
        },

        revisionCount: {
            type: Number,
            default: 0,
        },

        lastAttemptedAt: Date,
        completedAt: Date,
    },
    {
        timestamps: true,
    },
);

userProgressSchema.index({ user: 1, sheet: 1 }, { unique: true });

const UserProgress: Model<IUserProgress> = model<IUserProgress>('UserProgress', userProgressSchema);

export default UserProgress;
