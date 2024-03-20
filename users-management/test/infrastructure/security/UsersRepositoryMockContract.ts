import {UsersRepositoryContract} from "../../../src/infrastructure/data/repositories/UsersRepositoryContract";
import {SesameUser} from "../../../src/domain/entities/SesameUser";


export class UsersRepositoryMockContract implements UsersRepositoryContract{

    loginUserWithCredentials(email: string, password: string): Promise<SesameUser> {
        return Promise.resolve(undefined);
    }

}