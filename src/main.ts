import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const SERVER_PORT = process.env.SERVER_PORT;
  await app.listen(SERVER_PORT);
}
bootstrap();
