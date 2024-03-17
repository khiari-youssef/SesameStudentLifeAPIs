import {SesameUser} from "../../domain/entities/SesameUser";


export class LoginResponse{
    accessToken : string
    user : SesameUser

    constructor(user, accessToken : string) {
        this.user = user
        this.accessToken = accessToken
    }
}