import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../../domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(user: UserEntity): Promise<{
    access_token: string;
    id: string;
    username: string;
    role: string;
  }> {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }
}
