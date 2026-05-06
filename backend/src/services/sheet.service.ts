import Sheet, { ISheet } from '@/schema/sheet.schema';

export async function fetchSheet(name: ISheet['name']) {
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
