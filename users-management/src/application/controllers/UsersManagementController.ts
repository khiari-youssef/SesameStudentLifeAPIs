import {Body, Controller, Inject, Post} from "@nestjs/common";
import { EnrollmentForm } from "users-management/src/domain/entities/EnrollmentForm";
import { EnrollmentResult } from "users-management/src/domain/entities/EnrollmentResult";
import { UserEnrollmentUseCase } from "users-management/src/domain/usecases/UserEnrollmentUseCase";


@Controller('users')
export class UsersManagementController {
    constructor(
        private readonly enrollmentUseCase: UserEnrollmentUseCase
    ) {}

 
    @Post('enroll')
    async enrollUser(@Body() enrollmentForm : EnrollmentForm): Promise<EnrollmentResult | void> {
         
    }

}