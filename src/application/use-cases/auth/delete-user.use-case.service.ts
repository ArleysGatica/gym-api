import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LOGIN_REPOSITORY } from '../../../presentation/tokens/tokens';
import { UserRepository } from '../../../domain/interfaces/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(LOGIN_REPOSITORY)
    private readonly repository: UserRepository,
  ) {}

  async execute(id: string) {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return this.repository.delete(id);
  }
}
