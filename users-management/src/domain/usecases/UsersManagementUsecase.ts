import { Injectable } from '@nestjs/common';
import {SesameCredentialsLogin} from "../entities/SesameCredentialsLogin";
import {SesameUser} from "../entities/SesameUser";
import {DomainError, DomainErrorType} from "../exceptions/DomainError";
import { SesameRole } from "../entities/SesameRole";

@Injectable()
export class UsersManagementUsecase {


     async loginUserWithCredentials(credentialsLogin : SesameCredentialsLogin) : Promise<SesameUser|DomainError> {
              if (credentialsLogin.email == "youssef.khiari@sesame.com.tn" && credentialsLogin.password == "007007") {
                return new SesameUser(
                     "aedhfh",
                     "Youssef",
                     "Khiari",
                     "youssef.khiari@sesame.com.tn",
                     "h",
                     "",
                  '2024-01-01',
                  new SesameRole('Student',[])
                 )
             } else return  new DomainError("Invalid User",DomainErrorType.InvalidLogin)
     }
}