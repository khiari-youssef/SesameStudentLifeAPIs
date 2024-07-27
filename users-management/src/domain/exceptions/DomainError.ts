
export enum DomainErrorType {
    InvalidLogin,
    Unauthorized,
    InvalidSesameEmail,
    AnyError,
    InvalidForm,
    AlreadyInUse
}


export class DomainError extends Error{
    type : DomainErrorType
    constructor(message,type) {
        super(message);
        this.type = type
    }

}