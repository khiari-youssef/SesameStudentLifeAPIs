


export class SesameCredentialsLogin{
    email : string
    password : string

    constructor(
    email : string,
    password : string
    ) {
        this.email = email
        this.password = password
    }

     isEmailRequiredConstraintValid() : boolean {
        return this.email.trim().length > 0
    }
    isEmailDomainConstraintValid() : boolean {
        return this.email.endsWith("@sesame.com.tn")
    }
}