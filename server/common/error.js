export const createError = (errorStatus, errorMessage) => {
    const status = errorStatus
    const message = errorMessage
    const err = new Error()
    err.status = status
    err.message = message
    return err
}