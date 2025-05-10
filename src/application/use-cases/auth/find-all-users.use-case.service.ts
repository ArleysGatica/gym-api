import { Inject, Injectable } from '@nestjs/common';
import { LOGIN_REPOSITORY } from '../../../presentation/tokens/tokens';
import { UserRepository } from '../../../domain/interfaces/user.repository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject(LOGIN_REPOSITORY)
    private readonly repository: UserRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
