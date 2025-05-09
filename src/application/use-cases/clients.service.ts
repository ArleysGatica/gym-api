import { ConflictException, Inject, Injectable } from '@nestjs/common';
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

  async create(dto: CreateClientDto): Promise<ClientEntity> {
    const existingClient = await this.repository.findAll();
    const isDuplicate = existingClient.some((client) => client.name.toLowerCase() === dto.name.toLowerCase());

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

  update(id: string, client: Partial<ClientEntity>) {
    return this.repository.update(id, client);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }

  async getAllPaginated(skip: number, limit: number, search?: string) {
    return this.repository.findAllPaginated(skip, limit, search);
  }
}
