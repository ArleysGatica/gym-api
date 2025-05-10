import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '../../../domain/interfaces/client.repository';
import { CLIENT_REPOSITORY } from '../../../presentation/tokens/tokens';
import { ClientEntity } from '../../../domain/entities/client.entity';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly repository: ClientRepository,
  ) {}

  async execute(id: string, dto: Partial<ClientEntity>) {
    const client = await this.repository.findById(id);
    if (!client) throw new NotFoundException('Cliente no encontrado');
    return this.repository.update(id, dto);
  }
}
