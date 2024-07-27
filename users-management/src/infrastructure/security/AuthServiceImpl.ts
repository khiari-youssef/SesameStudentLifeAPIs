import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserLoginUsecase} from "../../domain/usecases/UserLoginUsecase";
import {SesameCredentialsLogin} from "../../domain/entities/SesameCredentialsLogin";
import {SesameUser} from "../../domain/entities/SesameUser";
import {LoginResponse} from "../../application/responsePayloads/LoginResponse";
import {AuthService} from "./AuthService";
import { DomainError,DomainErrorType } from 'users-management/src/domain/exceptions/DomainError';


@Injectable()
export class AuthServiceImpl implements AuthService{
    constructor(
         private readonly  usersManagementUsecase: UserLoginUsecase,
         private readonly jwtService: JwtService
    ) {}

    async loginUserWithCredentials(
        credentialsLogin : SesameCredentialsLogin
    ): Promise<LoginResponse> {
       return  this.usersManagementUsecase.execute(credentialsLogin).then(
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
                    throw new DomainError("Invalid login credentials !",DomainErrorType.InvalidLogin);
                }
            }
        )
    }
}