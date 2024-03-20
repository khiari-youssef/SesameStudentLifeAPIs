
export enum DomainErrorType {
    InvalidLogin,
    Unauthorized,
    InvalidSesameEmail,
    AnyError
}


export class DomainError extends Error{
    type : DomainErrorType
    constructor(message,type) {
        super(message);
        this.type = type
    }
}