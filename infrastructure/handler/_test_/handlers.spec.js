/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http')
const messages = require('../../../messages')

const {
    handleError,
    ErrorHandler,
    handleResponse,
    ResponseHandler,
} = require('..')

describe('Handlers', () => {
    it('handleError: Native error', async () => {
        const res = httpMocks.createResponse()
        handleError(new Error(messages.UNEXPECTED_ERROR), res)
        expect(JSON.parse(res._getData())).toEqual({
            status: 'ERROR',
            statusCode: 500,
            message: messages.UNEXPECTED_ERROR,
        })
    })

    it('handleError: Error Handler', async () => {
        const res = httpMocks.createResponse()
        handleError(new ErrorHandler(400, messages.ERROR_NOT_FOUNT), res)
        expect(JSON.parse(res._getData())).toEqual({
            status: 'ERROR',
            statusCode: 400,
            message: messages.ERROR_NOT_FOUNT,
        })
    })

    it('handleError: Error Handler no message', async () => {
        const res = httpMocks.createResponse()
        handleError(new ErrorHandler(400), res)
        expect(JSON.parse(res._getData())).toEqual({
            status: 'ERROR',
            statusCode: 400,
            message: messages.INTERNAL_ERROR,
        })
    })

    it('handleResponse: Response Handler', async () => {
        const res = httpMocks.createResponse()
        const data = new ResponseHandler(
            200,
            { sucess: true },
            messages.UPDATE_SUCCESS
        )
        handleResponse(data, res, () => {})

        expect(JSON.parse(res._getData())).toEqual({
            message: 'UPDATE SUCCESS',
            result: {
                sucess: true,
            },
            status: 'SUCCESS',
            statusCode: 200,
        })
    })

    it('handleResponse: Error Handler', async () => {
        const res = httpMocks.createResponse()
        handleResponse(
            new ErrorHandler(400, messages.ERROR_NOT_FOUNT),
            res,
            (info) => {
                handleError(info, res)
            }
        )

        expect(JSON.parse(res._getData())).toEqual({
            status: 'ERROR',
            statusCode: 400,
            message: messages.ERROR_NOT_FOUNT,
        })
    })

    it('handleResponse: object', async () => {
        const res = httpMocks.createResponse()
        const data = { injectedItem: true }
        handleResponse(data, res, () => {})
        expect(JSON.parse(res._getData())).toEqual({
            injectedItem: true,
        })
    })
})
