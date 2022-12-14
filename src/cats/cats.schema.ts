import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  // 등록과 수정 시 자동으로 createdAt과 modifiedAt을 찍어주는 옵션이다.
  timestamps: true,
};

// 에러 핸들링을 하기 위해서 class-validator를 사용한다.
@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'olaf@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'olaf',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1106',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;
}

// SchemaFactory.createForClass() 함수로 Cat 클래스를 Cat 스키마로 만든다.
export const CatSchema = SchemaFactory.createForClass(Cat);
