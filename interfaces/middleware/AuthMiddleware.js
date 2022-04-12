const { checkSchema, validationResult } = require('express-validator')

const messages = require('../../messages')

const { Logger } = require('../../infrastructure/logger')
const { ErrorHandler } = require('../../infrastructure/handler')

/**
 * Validates the token
 *
 * @author camilo.ordonez
 *
 */
module.exports = async (req, res, next) => {
    try {
        await checkSchema({
            authorization: {
                in: ['headers'],
                isEmpty: {
                    errorMessage: messages.TOKEN_NULL,
                    negated: true,
                    bail: true,
                },
            },
        }).run(req)
        const errors = validationResult(req)
        if (!errors.isEmpty())
            throw new ErrorHandler(
                400,
                errors.array().map((element) => element.msg)
            )
        next()
    } catch (error) {
        Logger.crit({
            level: 'crit',
            file: 'AuthMiddleware.ts',
            message: `${error.message}`,
            stack: error.stack,
        })
        next(error)
    }
}
