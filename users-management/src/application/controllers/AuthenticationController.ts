import {Body, Controller, Inject, Post} from "@nestjs/common";
import {LoginCredentials} from "../requestsPayloads/LoginCredentials";
import {LoginResponse} from "../responsePayloads/LoginResponse";
import {SesameCredentialsLogin} from "../../domain/entities/SesameCredentialsLogin";
import {AuthService} from "../../infrastructure/security/AuthService";

@Controller()
export class AuthenticationController {
    constructor(
      @Inject("AuthService")  private readonly  authService: AuthService
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
                return result
            },(error)=>{
                console.log(error)
                return  error
            })
    }
}