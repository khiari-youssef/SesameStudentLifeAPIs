import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.SERVER_PORT || 3000
  const host = process.env.SERVER_HOST || 'localhost'
  await app.listen(port,host,()=>{
     console.log(`Server running on ${host}:${port}`)
  });
}
bootstrap();