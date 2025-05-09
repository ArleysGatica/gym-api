import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '../../../domain/interfaces/client.repository';
import { CLIENT_REPOSITORY } from '../../../presentation/tokens/tokens';

@Injectable()
export class DeleteClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly repository: ClientRepository,
  ) {}

  async execute(id: string) {
    const client = await this.repository.findById(id);
    if (!client) throw new NotFoundException('Cliente no encontrado');
    return this.repository.delete(id);
  }
}
