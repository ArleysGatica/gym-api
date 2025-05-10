import { Inject, Injectable } from '@nestjs/common';
import { LOGIN_REPOSITORY } from '../../../presentation/tokens/tokens';
import { UserRepository } from '../../../domain/interfaces/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(LOGIN_REPOSITORY)
    private readonly repository: UserRepository,
  ) {}

  async execute(id: string, user: Partial<UserEntity>): Promise<Pick<UserEntity, 'id' | 'username' | 'role'>> {
    const updated = await this.repository.update(id, user);
    return {
      id: updated.id,
      username: updated.username,
      role: updated.role,
    };
  }
}
