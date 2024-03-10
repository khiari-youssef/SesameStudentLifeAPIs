import {SesameUser} from "../../domain/entities/SesameUser";


export class LoginResponse{
    message : string
    user : SesameUser

    constructor(message,user) {
        this.message  = message
        this.user = user
    }
}