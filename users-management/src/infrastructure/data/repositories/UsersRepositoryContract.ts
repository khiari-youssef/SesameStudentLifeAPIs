import {SesameUser} from "../../../domain/entities/SesameUser";
import {DomainError} from "../../../domain/exceptions/DomainError";


export interface UsersRepositoryContract{

     loginUserWithCredentials(email : string,password : string): Promise<SesameUser|DomainError>

}