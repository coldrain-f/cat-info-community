import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class CatSignUpResponseDto extends PickType(Cat, [
  'email',
  'name',
] as const) {
  @ApiProperty({
    example: '630a3610a275a9073c8d4dcc',
    description: '_id',
  })
  _id: string;
}
