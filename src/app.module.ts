import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersManagementModule} from "../users-management/src/application/module/UsersManagementModule";

@Module({
  imports: [UsersManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
