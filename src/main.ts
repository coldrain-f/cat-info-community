import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const SERVER_PORT = process.env.SERVER_PORT;

  // class-validator를 사용하려면 전역 파이프에 ValidationPipe()를 등록해 줘야 한다.
  app.useGlobalPipes(new ValidationPipe());

  // CORS 설정 추가
  app.enableCors({
    // 나중엔 FE 배포 URL으로 설정해야 한다.
    // true로 설정하면 모두 허용 상태
    origin: true,
    credentials: true,
  });

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
