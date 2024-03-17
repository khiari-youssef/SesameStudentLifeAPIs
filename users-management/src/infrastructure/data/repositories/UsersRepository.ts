import {UsersRepositoryContract} from "./UsersRepositoryContract";
import {Injectable} from "@nestjs/common";
import {SesameUser, UserSex} from "../../../domain/entities/SesameUser";
import {SesameRole} from "../../../domain/entities/SesameRole";
import {DomainError, DomainErrorType} from "../../../domain/exceptions/DomainError";


@Injectable()
export class UsersRepository implements UsersRepositoryContract{

     mockDatabase = [
        new SesameUser(
             "9c057fe2d493527a6f08a405f32387e96f569472",
             "Youssef",
             "Khiari",
             "youssef.khiari@sesame.com.tn",
             UserSex.Male,
             "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100177.jpg",
             "2020-11-02",
             new SesameRole(
                 SesameRole.StudentRole,
                 []
             )
         )
     ]

    async loginUserWithCredentials(email: string, password: string) : Promise<SesameUser|DomainError> {
        let result =this.mockDatabase.find((value)=>{
           return  value.email == email
        })
        if (result != null) return result
        return new DomainError("User not found !",DomainErrorType.InvalidLogin)
    }
}