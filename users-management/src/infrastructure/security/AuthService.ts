import {SesameCredentialsLogin} from "../../domain/entities/SesameCredentialsLogin";
import {LoginResponse} from "../../application/responsePayloads/LoginResponse";


export interface AuthService {

     loginUserWithCredentials(
        credentialsLogin : SesameCredentialsLogin
    ): Promise<LoginResponse>

}