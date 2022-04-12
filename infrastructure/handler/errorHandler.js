const messages = require('../../messages')
const { Logger } = require('../logger')

class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

const handleError = (err, res) => {
    const { statusCode = 500 } = err
    let { message = messages.INTERNAL_ERROR } = err

    if (!(err instanceof ErrorHandler)) {
        Logger.error({
            level: 'error',
            file: 'errorHandler.js',
            message: `${err.message}`,
            stack: err.stack,
        })
        message = messages.UNEXPECTED_ERROR
    }

    res.status(statusCode).json({
        status: 'ERROR',
        statusCode,
        message,
    })
}

module.exports = { ErrorHandler, handleError }
