import {Body, Controller, Inject, Post, Res, UnauthorizedException} from "@nestjs/common";
import {LoginCredentials} from "../requestsPayloads/LoginCredentials";
import {LoginResponse} from "../responsePayloads/LoginResponse";
import {SesameCredentialsLogin} from "../../domain/entities/SesameCredentialsLogin";
import {AuthService} from "../../infrastructure/security/AuthService";
import { DomainError } from "users-management/src/domain/exceptions/DomainError";

@Controller()
export class AuthenticationController {
    constructor(
      @Inject("AuthService")  private readonly  authService: AuthService
    ) {
    }

    @Post('auth')
    async loginUser(@Body() loginCredentials : LoginCredentials,@Res() response: Response): Promise<LoginResponse | void> {
        const domainLogin =  new SesameCredentialsLogin(
            loginCredentials.email,loginCredentials.password
        )
        return  this.authService.loginUserWithCredentials(domainLogin)
            .then((result)=>{
                console.log(result);
                return result;
            },(error)=>{
                console.error(error);
                if (error instanceof DomainError){
                    throw new UnauthorizedException(error.message);
                } else {
                    throw new UnauthorizedException(error);
                }
               
            })
    }

    
}