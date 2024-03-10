import { Module } from '@nestjs/common';
import {UsersManagementController} from "../controllers/UsersManagementController";
import {UsersManagementUsecase} from "../../domain/usecases/UsersManagementUsecase";


@Module({
    imports : [],
    providers : [UsersManagementUsecase],
   controllers : [UsersManagementController],
})
export class UsersManagementModule{

}