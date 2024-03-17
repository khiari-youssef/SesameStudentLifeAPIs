import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AuthModule} from "../../users-management/src/application/module/AuthModule";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [AuthModule,ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
