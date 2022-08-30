import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  // ORM에서 Repository라고 생각하고 사용하면 될듯 하다.
  // CatModule에서 스키마를 등록해야 사용할 수 있다.
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existByEmail(email);

    if (isCatExist) {
      // 403 Forbidden은 권한이 없어서 요청을 거부
      // 401 Unauthorized는 인증되지 않았기 때문에 요청 거부
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    // bycript는 공식문서에서 설치 후 사용해야 한다.
    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return {
      id_: cat._id,
      email: cat.email,
      name: cat.name,
    };
  }
}
