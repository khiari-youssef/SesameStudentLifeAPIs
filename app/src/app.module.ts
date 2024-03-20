import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AuthModule} from "../../users-management/src/application/module/AuthModule";
import {EnvConfig} from "../../config/AppConfiguration";

@Module({
  imports: [AuthModule,EnvConfig],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
