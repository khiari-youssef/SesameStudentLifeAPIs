import {Inject, Injectable} from '@nestjs/common';
import {SesameCredentialsLogin} from "../entities/SesameCredentialsLogin";
import {SesameUser} from "../entities/SesameUser";
import {DomainError} from "../exceptions/DomainError";
import {UsersRepositoryContract} from "../../infrastructure/data/repositories/UsersRepositoryContract";

@Injectable()
export class UsersManagementUsecase {

    constructor(
       @Inject('UsersRepositoryContract') private readonly  repositoryContract: UsersRepositoryContract,
    ){

    }


     async loginUserWithCredentials(credentialsLogin : SesameCredentialsLogin) : Promise<SesameUser|DomainError> {
         return await this.repositoryContract.loginUserWithCredentials(
             credentialsLogin.email,
             credentialsLogin.password
         )
     }
}