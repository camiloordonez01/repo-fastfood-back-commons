import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

import messages from '../../messages'

import { logger, ErrorHandler } from '../../infrastructure/handler'

/**
 * Validates the token
 *
 * @author camilo.ordonez
 *
 */
const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // create schema object
        const schemaBody = Joi.object({
            authorization: Joi.string().required(),
        })

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        }

        // validate request body against schema
        const { error } = schemaBody.validate(req.body, options)

        const messagesError: string[] = []
        error?.details.forEach((element) => {
            switch (element.context?.key) {
                case 'authorization':
                    if (element.type === 'any.required') {
                        messagesError.push(messages.TOKEN_NULL as string)
                    }
                    break
            }
        })

        if (messagesError.length > 0) {
            throw new ErrorHandler(400, messagesError[0])
        }
        next()
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file: 'AuthMiddleware.ts',
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}

export default AuthMiddleware
