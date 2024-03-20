import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersManagementUsecase} from "../../domain/usecases/UsersManagementUsecase";
import {SesameCredentialsLogin} from "../../domain/entities/SesameCredentialsLogin";
import {SesameUser} from "../../domain/entities/SesameUser";
import {LoginResponse} from "../../application/responsePayloads/LoginResponse";
import {AuthService} from "./AuthService";

@Injectable()
export class AuthServiceImpl implements AuthService{
    constructor(
         private readonly  usersManagementUsecase: UsersManagementUsecase,
         private readonly jwtService: JwtService
    ) {}

    async loginUserWithCredentials(
        credentialsLogin : SesameCredentialsLogin
    ): Promise<LoginResponse> {
       return  this.usersManagementUsecase.loginUserWithCredentials(credentialsLogin).then(
           async (result)=>{
                if (result instanceof SesameUser) {
                    const accessToken =  await this.jwtService.signAsync({
                        email : result.email,
                        role : result.role
                    })
                    return new LoginResponse(
                        result,
                        accessToken
                    );
                } else {
                    throw result
                }
            }
        )
    }
}