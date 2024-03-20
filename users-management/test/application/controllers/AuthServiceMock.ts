import {AuthService} from "../../../src/infrastructure/security/AuthService";
import {SesameCredentialsLogin} from "../../../src/domain/entities/SesameCredentialsLogin";
import {LoginResponse} from "../../../src/application/responsePayloads/LoginResponse";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AuthServiceMock implements  AuthService{

    loginUserWithCredentials(credentialsLogin: SesameCredentialsLogin): Promise<LoginResponse> {
        return Promise.resolve(undefined);
    }

}