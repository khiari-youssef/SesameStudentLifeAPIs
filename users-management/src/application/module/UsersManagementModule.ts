import {Module} from '@nestjs/common';
import {UsersManagementController} from "../controllers/UsersManagementController";
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
   controllers : [UsersManagementController],
    exports : [UserLoginUsecase,UserEnrollmentUseCase]
})
export class UsersManagementModule{}