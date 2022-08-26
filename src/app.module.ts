import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Mongoose 공식 문서:
// https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      // 최신 몽고DB 드라이버 엔진을 사용하도록 설정한다.
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
// NestModule을 implements 해서
// configure() {}안에 mongoose.set('debug', true)를 추가해 주면
// 몽고DB 사용시 로그가 찍히도록 설정할 수 있다.
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    mongoose.set('debug', this.isDev);
  }
}
