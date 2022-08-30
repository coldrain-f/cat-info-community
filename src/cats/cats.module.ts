import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './cats.service';

@Module({
  // 이 부분을 추가해 줘야 CatsService에서 catModel을 DI받을 수 있다.
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  // Repository를 공급자로 등록해 둬야 DI 받아서 사용할 수 있다.
  providers: [CatsService, CatsRepository],
})
export class CatsModule {}
