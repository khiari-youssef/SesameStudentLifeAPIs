import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigModule} from "@nestjs/config";



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.SERVER_PORT)
  const port = process.env.SERVER_PORT || 3000
  const host = process.env.SERVER_HOST || 'localhost'
  await app.listen(port,host,()=>{
     console.log(`Server running on ${host}:${port} with ${process.env.NODE_ENV} environment`)
  });
}
bootstrap();
