import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LOGIN_REPOSITORY } from '../../../presentation/tokens/tokens';
import { UserRepository } from '../../../domain/interfaces/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    @Inject(LOGIN_REPOSITORY)
    private readonly repository: UserRepository,
  ) {}

  async execute(username: string, password: string): Promise<UserEntity | null> {
    const user = await this.repository.findByUsername(username);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
}
