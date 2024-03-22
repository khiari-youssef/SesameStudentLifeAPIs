import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {LogConfigDev, LogConfigProd, LogConfigStaging} from "../../config/AppConfiguration";
import {NestApplicationOptions} from "@nestjs/common/interfaces/nest-application-options.interface";


async function bootstrap() {

  const appOptions : NestApplicationOptions = process.env.NODE_ENV == "production" ? LogConfigProd : (process.env.NODE_ENV == "staging" ? LogConfigStaging : LogConfigDev)
  const app = await NestFactory.create(
      AppModule,
      appOptions
);
  const port = process.env.SERVER_PORT || 3000
  const host = process.env.SERVER_HOST || 'localhost'

  await app.listen(port,host,()=>{
    console.log("path  " +process.env.SSL_PRIVATE_KEY_PATH)
     console.log(`Server running on ${host}:${port} with ${process.env.NODE_ENV} environment`)
  });
}
bootstrap();
