import {Module} from '@nestjs/common';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {UsersManagementModule} from "./UsersManagementModule";
import {AuthServiceImpl} from "../../infrastructure/security/AuthServiceImpl";
import {AuthenticationController} from "../controllers/AuthenticationController";
import {EnvConfig} from "../../../../config/AppConfiguration";
import {UsersManagementUsecase} from "../../domain/usecases/UsersManagementUsecase";

const AuthServiceFactory = (usersManagementUsecase : UsersManagementUsecase,jwtService: JwtService) => {
    return  new AuthServiceImpl(usersManagementUsecase,jwtService)
}

@Module({
    imports: [
        UsersManagementModule,
        EnvConfig,
        JwtModule.register({
            global: true,
            secret:  process.env.JWT_SECRET,
            signOptions: { expiresIn: `${process.env.JWT_EXP_HOURS}h` },
        }),
    ],
    providers: [
        {
            provide: 'AuthService',
            useFactory: AuthServiceFactory,
            inject:[UsersManagementUsecase,JwtService]
        }
    ],
    controllers: [AuthenticationController],
    exports: [],
})
export class AuthModule {}