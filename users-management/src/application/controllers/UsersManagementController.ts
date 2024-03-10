import {Body, Controller, InternalServerErrorException, Post} from '@nestjs/common';
import {UsersManagementUsecase} from "../../domain/usecases/UsersManagementUsecase";
import {LoginCredentials} from "../requestsPayloads/LoginCredentials";
import {LoginResponse} from "../responsePayloads/LoginResponse";
import {InvalidLoginException} from "../responsePayloads/InvalidLoginException";
import {SesameCredentialsLogin} from "../../domain/entities/SesameCredentialsLogin";
import {SesameUser} from "../../domain/entities/SesameUser";
import {DomainErrorType} from "../../domain/exceptions/DomainError";


@Controller('sesame-users')
export class UsersManagementController {
    constructor(
        private readonly usersManagementUsecase: UsersManagementUsecase
    ) {}


    @Post('login')
    async loginUser(@Body() loginCredentials : LoginCredentials): Promise<LoginResponse | void> {
        const domainLogin =  new SesameCredentialsLogin(
            loginCredentials.email,loginCredentials.password
        )
       return  this.usersManagementUsecase.loginUserWithCredentials(domainLogin)
           .then((result)=>{
           console.log(result)
             if (result instanceof SesameUser) {
                 return  new LoginResponse("success",result)
               } else {
                 if (result.type == DomainErrorType.InvalidLogin) {
                     throw new InvalidLoginException("invalid login credentials")
                 } else throw new InternalServerErrorException()
               }
            })
    }
}