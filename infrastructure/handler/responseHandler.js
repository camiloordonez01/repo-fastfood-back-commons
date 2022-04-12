class ResponseHandler {
    constructor(statusCode, result, message) {
        this.statusCode = statusCode
        this.result = result
        this.message = message
    }
}

const handleResponse = (info, res, next) => {
    if (info instanceof Error) {
        next(info)
    } else if (info instanceof ResponseHandler) {
        const { statusCode, result, message } = info
        res.status(statusCode).json({
            status: 'SUCCESS',
            statusCode,
            result,
            message,
        })
    } else {
        res.json(info)
    }
}

module.exports = { ResponseHandler, handleResponse }
