import Problem from '@/schema/problem';
import { Types } from 'mongoose';

export async function fetchProblem(name: string, userId: Types.ObjectId) {
    const result = await Problem.aggregate([
        {
            $match: {
                name: name,
            },
        },

        {
            $sort: {
                topicIndex: 1,
                problemNumber: 1,
            },
        },

        {
            $lookup: {
                from: 'userprogresses',

                let: {
                    problemId: '$_id',
                },

                pipeline: [
                    {
                        $match: {
                            user: userId,
                        },
                    },

                    {
                        $match: {
                            $expr: {
                                $eq: ['$problem', '$$problemId'],
                            },
                        },
                    },

                    {
                        $project: {
                            _id: 0,
                            status: 1,
                        },
                    },
                ],

                as: 'progress',
            },
        },

        {
            $addFields: {
                status: {
                    $ifNull: [
                        {
                            $first: '$progress.status',
                        },
                        'pending',
                    ],
                },
            },
        },

        {
            $project: {
                progress: 0,
            },
        },

        {
            $group: {
                _id: '$topic',

                topicIndex: {
                    $first: '$topicIndex',
                },

                problems: {
                    $push: '$$ROOT',
                },
            },
        },

        {
            $sort: {
                topicIndex: 1,
            },
        },
    ]);

    return result;
}
