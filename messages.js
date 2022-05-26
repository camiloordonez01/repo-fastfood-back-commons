module.exports = Object.freeze({
    INTERNAL_ERROR: 'Error Interno',
    UNEXPECTED_ERROR: 'Error inesperado',
    ERROR_NOT_FOUNT: 'Not found',
    UPDATE_SUCCESS: 'UPDATE SUCCESS',
    VALIDATE_LENGTH: (field, minimo, max) =>
        `El campo '${field}' debe tener entre ${minimo} a ${max} caracteres`,
    VALIDATE_REQUIRED: (field) => `${field} es requerido`,
})
