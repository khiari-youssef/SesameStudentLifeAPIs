import {UsersRepositoryContract} from "./UsersRepositoryContract";
import {Injectable} from "@nestjs/common";
import {SesameUser, UserSex} from "../../../domain/entities/SesameUser";
import {
    SesamePermissions,
    SesamePermissionState,
    SesameRole,
    SesameRoleType
} from "../../../domain/entities/SesameRole";


@Injectable()
export class UsersRepository implements UsersRepositoryContract{

     mockDatabase = [
         {
             user : new SesameUser(
                 "9c057fe2d493527a6f08a405f32387e96f569472",
                 "Youssef",
                 "Khiari",
                 "youssef.khiari@sesame.com.tn",
                 UserSex.Male,
                 "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100177.jpg",
                 "2020-11-02",
                 new SesameRole(
                     SesameRoleType.Student,
                     "randomid",
                     [{
                         permission : SesamePermissions.USER_LOGIN,
                         description : "controls user's action to login and logout",
                         state : SesamePermissionState.GRANTED
                     },{
                         permission : SesamePermissions.USER_VIEW_PROFILE,
                         description : "controls user's action to login and logout",
                         state : SesamePermissionState.GRANTED
                     },{
                         permission : SesamePermissions.USER_UPDATE_PROFILE,
                         description : "controls user's action to login and logout",
                         state : SesamePermissionState.GRANTED
                     }
                     ]
                 )
             ),
             password : "0000"
         }
     ]

    async loginUserWithCredentials(email: string, password: string) : Promise<SesameUser> {
        return  this.mockDatabase.find((value) => {
          return value.user.email == email && value.password == password
      }).user;
    }
}