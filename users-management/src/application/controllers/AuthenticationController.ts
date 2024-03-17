import {Body, Controller, InternalServerErrorException, Post} from "@nestjs/common";
import {LoginCredentials} from "../requestsPayloads/LoginCredentials";
import {LoginResponse} from "../responsePayloads/LoginResponse";
import {SesameCredentialsLogin} from "../../domain/entities/SesameCredentialsLogin";
import {DomainError, DomainErrorType} from "../../domain/exceptions/DomainError";
import {InvalidLoginException} from "../responsePayloads/InvalidLoginException";
import {AuthService} from "../../infrastructure/security/AuthService";

@Controller()
export class AuthenticationController {
    constructor(
        private readonly  authService: AuthService
    ) {
    }

    @Post('auth')
    async loginUser(@Body() loginCredentials : LoginCredentials): Promise<LoginResponse | void> {
        const domainLogin =  new SesameCredentialsLogin(
            loginCredentials.email,loginCredentials.password
        )
        return  this.authService.loginUserWithCredentials(domainLogin)
            .then((result)=>{
                console.log(result)
                if (result instanceof DomainError) {
                    if (result.type == DomainErrorType.InvalidLogin) {
                        throw new InvalidLoginException("invalid login credentials")
                    } else throw new InternalServerErrorException()
                } else {
                   return result
                }
            })
    }
}