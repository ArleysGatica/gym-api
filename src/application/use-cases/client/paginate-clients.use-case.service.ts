import { Inject, Injectable } from '@nestjs/common';
import { ClientRepository } from '../../../domain/interfaces/client.repository';
import { CLIENT_REPOSITORY } from '../../../presentation/tokens/tokens';

@Injectable()
export class PaginateClientsUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly repository: ClientRepository,
  ) {}

  execute(skip: number, limit: number, search?: string) {
    return this.repository.findAllPaginated(skip, limit, search);
  }
}
