import {SesameUser} from "../../../domain/entities/SesameUser";


export interface UsersRepositoryContract{

     loginUserWithCredentials(email : string,password : string): Promise<SesameUser>

}