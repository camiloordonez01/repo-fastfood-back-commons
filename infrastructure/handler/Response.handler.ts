import { Response } from 'express'
import { handleError } from './Error.handler'

import messages from '../../messages'

class ResponseHandler {
    public readonly statusCode: number

    result: unknown

    constructor(statusCode: number, result: unknown) {
        this.statusCode = statusCode
        this.result = result
    }
}

const handleResponse = (info: unknown | Error, res: Response) => {
    if (info instanceof Error) {
        handleError(info, res)
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
