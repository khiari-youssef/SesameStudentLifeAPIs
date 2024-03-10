

export enum DomainErrorType {
    InvalidLogin,
    Unauthorized,
    InvalidSesameEmail,
    AnyError
}


export class DomainError {
    message: string
    type : DomainErrorType
    constructor(message,type) {
        this.type = type
        this.message = message
    }
}