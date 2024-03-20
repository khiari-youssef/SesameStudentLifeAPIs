import {Inject, Injectable} from '@nestjs/common';
import {SesameCredentialsLogin} from "../entities/SesameCredentialsLogin";
import {SesameUser} from "../entities/SesameUser";
import {DomainError, DomainErrorType} from "../exceptions/DomainError";
import {UsersRepositoryContract} from "../../infrastructure/data/repositories/UsersRepositoryContract";

@Injectable()
export class UsersManagementUsecase {

    constructor(
       @Inject('UsersRepositoryContract') private readonly  repositoryContract: UsersRepositoryContract,
    ){

    }


     async loginUserWithCredentials(credentialsLogin : SesameCredentialsLogin) : Promise<SesameUser|DomainError> {
          if (credentialsLogin.isEmailRequiredConstraintValid()) {
             if (credentialsLogin.isEmailDomainConstraintValid()) {
                return  await this.repositoryContract.loginUserWithCredentials(
                     credentialsLogin.email,
                     credentialsLogin.password
                 ).then((result)=>{
                     if (!result) return  new DomainError("User with such login not found",DomainErrorType.InvalidLogin)
                     return  result
                 },()=>{
                    return  new DomainError("User with such login not found",DomainErrorType.InvalidLogin)
                })
             } else return  new DomainError("Invalid email sesame domain !",DomainErrorType.InvalidSesameEmail)
         } else return  new DomainError("Email is not valid",DomainErrorType.InvalidSesameEmail)
     }
}