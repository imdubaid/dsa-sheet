import Sheet from '@/schema/sheet';
import { Types } from 'mongoose';

export async function fetchSheet(name: string, userId: Types.ObjectId) {
    const result = await Sheet.aggregate([
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
                    sheetId: '$_id',
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
                                $eq: ['$sheet', '$$sheetId'],
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
