import {Module} from '@nestjs/common';
import {UsersManagementController} from "../controllers/UsersManagementController";
import {UsersManagementUsecase} from "../../domain/usecases/UsersManagementUsecase";
import {UsersRepository} from "../../infrastructure/data/repositories/UsersRepository";


@Module({
    imports : [],
    providers : [{
        provide: 'UsersRepositoryContract',
        useValue: new UsersRepository()
    },UsersManagementUsecase],
   controllers : [UsersManagementController],
    exports : [UsersManagementUsecase]
})
export class UsersManagementModule{}