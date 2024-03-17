import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersManagementUsecase} from "../../domain/usecases/UsersManagementUsecase";
import {SesameCredentialsLogin} from "../../domain/entities/SesameCredentialsLogin";
import {DomainError} from "../../domain/exceptions/DomainError";
import {SesameUser} from "../../domain/entities/SesameUser";
import {LoginResponse} from "../../application/responsePayloads/LoginResponse";

@Injectable()
export class AuthService {
    constructor(
        private readonly  usersManagementUsecase: UsersManagementUsecase,
        private readonly jwtService: JwtService
    ) {}

    async loginUserWithCredentials(
        credentialsLogin : SesameCredentialsLogin
    ): Promise<LoginResponse|DomainError> {
        const result = await this.usersManagementUsecase.loginUserWithCredentials(credentialsLogin);
        if (result instanceof  SesameUser) {
            const accessToken =  await this.jwtService.signAsync({
                email : result.email,
                role : result.role
            })
           return new LoginResponse(
                result,
                accessToken
            );
        } else {
            return result
        }
    }
}