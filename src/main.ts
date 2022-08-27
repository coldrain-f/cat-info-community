import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const SERVER_PORT = process.env.SERVER_PORT;

  // class-validator를 사용하려면 전역 파이프에 ValidationPipe()를 등록해 줘야 한다.
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(SERVER_PORT);
}
bootstrap();
