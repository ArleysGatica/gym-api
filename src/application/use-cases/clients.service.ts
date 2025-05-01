import { Inject, Injectable } from '@nestjs/common';
import { ClientRepository } from '../../domain/interfaces/client.repository';
import { ClientEntity } from '../../domain/entities/client.entity';
import { CLIENT_REPOSITORY } from '../../presentation/tokens/tokens';
import { CreateClientDto } from '../../presentation/dto/create-client.dto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ClientService {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly repository: ClientRepository,
  ) {}

  findAll() {
    return this.repository.findAll();
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  create(dto: CreateClientDto) {
    const client: ClientEntity = {
      ...dto,
      _id: uuidv4(),
      name: dto.name,
      startDate: new Date(),
      nextPayment: null,
      status: 'active',
    };
    return this.repository.create(client);
  }

  update(id: string, client: Partial<ClientEntity>) {
    return this.repository.update(id, client);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
