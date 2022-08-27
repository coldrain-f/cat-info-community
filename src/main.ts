import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const SERVER_PORT = process.env.SERVER_PORT;

  // class-validator를 사용하려면 전역 파이프에 ValidationPipe()를 등록해 줘야 한다.
  app.useGlobalPipes(new ValidationPipe());

  // 스웨거 설정 추가
  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('cat')
    .setVersion('1.0.0')
    .addTag('')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(SERVER_PORT);
}
bootstrap();
