import {Module} from '@nestjs/common';
import {UsersRegistrationController} from "../controllers/UsersRegistrationController";
import {UserLoginUsecase} from "../../domain/usecases/UserLoginUsecase";
import {UserEnrollmentUseCase} from "../../domain/usecases/UserEnrollmentUseCase";
import {UsersRepository,} from "../../infrastructure/data/repositories/UsersRepository";
import {EnrollmentRepository} from "../../infrastructure/data/repositories/EnrollmentRepository";
import {EnrollmentFormMapper} from "../../infrastructure/ports/EnrollmentFormMapper";
import {CoreModule} from "../../../../core/src/module/CoreModule";


@Module({
    imports : [
        CoreModule
    ],
    providers : [
        {
        provide: 'UsersRepositoryContract',
        useValue: new UsersRepository()
      },
      {
        provide: 'EnrollmentRepositoryContract',
        useValue: new EnrollmentRepository()
      },
    UserLoginUsecase,
    UserEnrollmentUseCase,
    EnrollmentFormMapper
],
   controllers : [UsersRegistrationController],
    exports : [UserLoginUsecase,UserEnrollmentUseCase]
})
export class UsersManagementModule{}