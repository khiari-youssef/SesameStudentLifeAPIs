import {UsersRepositoryContract} from "./UsersRepositoryContract";
import {Injectable} from "@nestjs/common";


@Injectable()
class UsersRepository implements UsersRepositoryContract{

    loginUserWithCredentials(email: string, password: string) {

    }
}