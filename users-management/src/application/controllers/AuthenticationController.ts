import {Body, Controller, HttpStatus, Inject, Post, Res, ValidationPipe} from "@nestjs/common";
import {LoginCredentials} from "../requestsPayloads/LoginCredentials";
import {Response} from "express";
import {LoginResponse} from "../responsePayloads/LoginResponse";
import {SesameCredentialsLogin} from "../../domain/entities/SesameCredentialsLogin";
import {AuthService} from "../../infrastructure/security/AuthService";
import {DomainError} from "users-management/src/domain/exceptions/DomainError";

@Controller('auth')
export class AuthenticationController {
    constructor(
      @Inject("AuthService")  private readonly  authService: AuthService
    ) {
    }

    @Post('credentials')
    async loginUser(@Body(new ValidationPipe({
        expectedType: LoginCredentials,
        errorHttpStatusCode : HttpStatus.BAD_REQUEST,
    })) loginCredentials : LoginCredentials,@Res() response: Response): Promise<LoginResponse | void> {

        const domainLogin =  new SesameCredentialsLogin(
            loginCredentials.email,loginCredentials.password
        )
        try {
            let  result : LoginResponse = await this.authService.loginUserWithCredentials(domainLogin);
            console.log(result);
            response.status(200).send(result);
        } catch (error){
            console.error(error);
            if (error instanceof DomainError){
                response.status(401).send({
                    "error_code" : error.type.toString(),
                    "error_message" : error.message,
                    "details" : {}
                })
            } else {
                response.status(500).send({
                    "error_message" : error.message
                })
            }
        }
    }

    
}