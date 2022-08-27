import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// Swagger의 PickType을 상속받으면 스키마에서 필요한 데이터만 가지고 올 수 있다.
export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password' as const,
]) {}
