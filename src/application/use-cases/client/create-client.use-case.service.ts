import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { ClientRepository } from '../../../domain/interfaces/client.repository';
import { CLIENT_REPOSITORY } from '../../../presentation/tokens/tokens';
import { CreateClientDto } from '../../../presentation/dto/create-client.dto';
import { ClientEntity } from '../../../domain/entities/client.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly repository: ClientRepository,
  ) {}

  async execute(dto: CreateClientDto): Promise<ClientEntity> {
    const existing = await this.repository.findAll();
    const isDuplicate = existing.some((client) => client.name.toLowerCase() === dto.name.toLowerCase());
    if (isDuplicate) {
      throw new ConflictException('El cliente ya existe');
    }

    const client: ClientEntity = {
      ...dto,
      _id: uuidv4(),
      status: 'active',
      daysOverdue: 0,
      daysRemaining: 30,
    };

    return this.repository.create(client);
  }
}
