import { Messages } from './application/common/types'

const messages: Messages = {
    INTERNAL_ERROR: 'Error Interno',
    UNEXPECTED_ERROR: 'Error inesperado',
    ERROR_NOT_FOUNT: 'Not found',
    UPDATE_SUCCESS: 'UPDATE SUCCESS',
    UPDATE_ERROR: 'UPDATE ERROR',
    HANDLE_ERROR: 'ERROR',
    HANDLE_SUCCESS: 'SUCCESS',
    PARAMS_ERROR:'Parámetro incorrecto'
}

export const validateLength = (field: string, minimo: number, max: number) =>
    `El campo '${field}' debe tener entre ${minimo} a ${max} caracteres`
export const validateRequired = (field: string) => `${field} es requerido`

export default messages
