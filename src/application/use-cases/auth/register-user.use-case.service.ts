import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../../domain/interfaces/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { RegisterDto } from '../../../presentation/dto/auth/login.dto';
import { LOGIN_REPOSITORY } from '../../../presentation/tokens/tokens';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(LOGIN_REPOSITORY)
    private readonly repository: UserRepository,
  ) {}

  async execute(dto: RegisterDto): Promise<UserEntity> {
    const existingUser = await this.repository.findByUsername(dto.username);
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user: UserEntity = {
      ...dto,
      password: hashedPassword,
      id: uuidv4(),
    };

    return this.repository.create(user);
  }
}
