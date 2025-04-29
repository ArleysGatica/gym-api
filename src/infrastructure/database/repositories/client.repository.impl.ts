import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../../domain/interfaces/client.repository';
import { ClientEntity } from '../../../domain/entities/client.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClientRepositoryImpl implements ClientRepository {
  private clients: ClientEntity[] = [];

  async findAll(): Promise<ClientEntity[]> {
    return this.clients;
  }

  async findById(id: string): Promise<ClientEntity | null> {
    return this.clients.find((c) => c.id === id) || null;
  }

  async create(client: ClientEntity): Promise<ClientEntity> {
    const newClient = { ...client, id: uuidv4() };
    this.clients.push(newClient);
    return newClient;
  }

  async update(
    id: string,
    client: Partial<ClientEntity>,
  ): Promise<ClientEntity> {
    const index = this.clients.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Client not found');
    this.clients[index] = { ...this.clients[index], ...client };
    return this.clients[index];
  }

  async delete(id: string): Promise<void> {
    this.clients = this.clients.filter((c) => c.id !== id);
  }
}
