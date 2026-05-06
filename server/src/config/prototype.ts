import express from 'express';

express.response.success = function (res: object | string | number) {
    if (typeof res === 'string')
        return this.json({
            message: res,
            success: true,
        });

    if (typeof res === 'number') return this.status(res).send(); // No Content

    return this.json({
        data: res,
        success: true,
    });
};

express.response.error = function (res: object | string) {
    if (typeof res === 'string')
        return this.json({
            message: res,
            success: false,
        });

    return this.json({
        ...res,
        success: false,
    });
};

// Error.throw = function (msg, code = 400) {
//     const error = new Error(msg);
//     error.name = 'CustomError';
//     throw error;
// };
