import { NextFunction, Response } from 'express'

import messages from '../../messages'

class ResponseHandler {
    public readonly statusCode: number

    result: unknown

    constructor(statusCode: number, result: unknown) {
        this.statusCode = statusCode
        this.result = result
    }
}

const handleResponse = (info: unknown, res: Response, next: NextFunction) => {
    if (info instanceof Error) {
        next(info)
    } else if (info instanceof ResponseHandler) {
        const { statusCode, result } = info
        res.status(statusCode).json({
            status: messages.HANDLE_SUCCESS,
            statusCode,
            result,
        })
    } else {
        res.json(info)
    }
}

export { ResponseHandler, handleResponse }
