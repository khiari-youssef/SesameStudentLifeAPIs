import {SesameUser} from "../../../domain/entities/SesameUser";


export interface UsersRepositoryContract{

    fetchUserByEmailAndPassword(email : string,password : string): Promise<SesameUser>

}