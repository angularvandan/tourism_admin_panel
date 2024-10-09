export const success = (message: string) => {
    return {
        severity: 'success',
        summary: 'Success',
        detail: message
    }
}
export const error = (message: string) => {
    return {
        severity: 'error',
        summary: 'Error',
        detail: message
    }
}
export const warning = (message: string) => {
    return {
        severity: 'warn',
        summary: 'Warning',
        detail: message
    }
}
export const info = (message: string) => {
    return {
        severity: 'info',
        summary: 'Info',
        detail: message
    }
}