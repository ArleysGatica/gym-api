import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LOGIN_REPOSITORY } from '../../../presentation/tokens/tokens';
import { UserRepository } from '../../../domain/interfaces/user.repository';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(LOGIN_REPOSITORY)
    private readonly repository: UserRepository,
  ) {}

  async execute(id: string, password: string) {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.repository.update(id, { password: hashedPassword });
  }
}
