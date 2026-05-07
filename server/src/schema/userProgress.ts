import { problemStatus } from '@/types/constants';
import { Document, Model, model, Schema, Types } from 'mongoose';

export interface IUserProgress extends Document {
    user: Types.ObjectId;
    problem: Types.ObjectId;
    status: (typeof problemStatus)[number];
    notes?: string;
    revisionCount: number;
}

const userProgressSchema = new Schema<IUserProgress>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        problem: {
            type: Schema.Types.ObjectId,
            ref: 'Problem',
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
    },
    {
        timestamps: true,
    },
);

userProgressSchema.index({ user: 1, problem: 1 }, { unique: true });

const UserProgress: Model<IUserProgress> = model<IUserProgress>('UserProgress', userProgressSchema);

export default UserProgress;
