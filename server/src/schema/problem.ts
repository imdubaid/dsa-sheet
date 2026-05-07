import { Document, Model, model, Schema } from 'mongoose';
import validator from 'validator';
import { difficulty } from '@/types/constants';

type Links = {
    leetcode: string;
    gfg: string;
    tuf: string;
    youtube: string;
};

export interface IProblem extends Document {
    name: string;
    topic: string;
    topicIndex: number;
    problemNumber: number;
    title: string;
    slug: string;
    difficulty: (typeof difficulty)[number];
    links: Links;
}

const problemSchema = new Schema<IProblem>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    topic: {
        type: String,
        required: true,
        trim: true,
    },

    topicIndex: {
        type: Number,
        required: true,
        min: 0,
    },

    problemNumber: {
        type: Number,
        required: true,
        min: 1,
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    difficulty: {
        type: String,
        enum: difficulty,
        required: true,
    },

    links: {
        leetcode: {
            type: String,
            trim: true,
            validate: {
                validator: (value: string) => !value || validator.isURL(value),
                message: 'Invalid LeetCode URL',
            },
        },

        gfg: {
            type: String,
            trim: true,
            validate: {
                validator: (value: string) => !value || validator.isURL(value),
                message: 'Invalid GFG URL',
            },
        },

        tuf: {
            type: String,
            trim: true,
            validate: {
                validator: (value: string) => !value || validator.isURL(value),
                message: 'Invalid TUF URL',
            },
        },

        youtube: {
            type: String,
            trim: true,
            validate: {
                validator: (value: string) => !value || validator.isURL(value),
                message: 'Invalid YouTube URL',
            },
        },
    },
});

problemSchema.index({
    name: 1,
    topicIndex: 1,
    problemNumber: 1,
});

const Problem: Model<IProblem> = model<IProblem>('Problem', problemSchema);

export default Problem;
