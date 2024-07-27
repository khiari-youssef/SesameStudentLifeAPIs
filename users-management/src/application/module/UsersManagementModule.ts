import {Module} from '@nestjs/common';
import {UsersRegistrationController} from "../controllers/UsersRegistrationController";
import {UserLoginUsecase} from "../../domain/usecases/UserLoginUsecase";
import {UserEnrollmentUseCase} from "../../domain/usecases/UserEnrollmentUseCase";
import {UsersRepository,} from "../../infrastructure/data/repositories/UsersRepository";
import {EnrollmentRepository} from "../../infrastructure/data/repositories/EnrollmentRepository";


@Module({
    imports : [],
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
    UserEnrollmentUseCase
],
   controllers : [UsersRegistrationController],
    exports : [UserLoginUsecase,UserEnrollmentUseCase]
})
export class UsersManagementModule{}