import {Controller} from '@nestjs/common';
import {UsersManagementUsecase} from "../../domain/usecases/UsersManagementUsecase";


@Controller('users')
export class UsersManagementController {
    constructor(
        private readonly usersManagementUsecase: UsersManagementUsecase
    ) {}




}