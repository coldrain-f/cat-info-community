import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existByEmail(email: string): Promise<{ _id: any } | null> {
    return await this.catModel.exists({ email });
  }

  async create(CatRequestDto: CatRequestDto) {
    return await this.catModel.create(CatRequestDto);
  }
}
