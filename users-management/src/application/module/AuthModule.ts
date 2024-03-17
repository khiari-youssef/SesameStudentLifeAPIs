import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {UsersManagementModule} from "./UsersManagementModule";
import {AuthService} from "../../infrastructure/security/AuthService";
import {AuthenticationController} from "../controllers/AuthenticationController";

require('dotenv').config()

@Module({
    imports: [
        UsersManagementModule,
        JwtModule.register({
            global: true,
            secret:  process.env.JWT_SECRET,
            signOptions: { expiresIn: `${process.env.JWT_EXP_HOURS}h` },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthenticationController],
    exports: [AuthService],
})
export class AuthModule {}