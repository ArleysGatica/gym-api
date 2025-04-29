import { ClientEntity } from '../entities/client.entity';

export interface ClientRepository {
  findAll(): Promise<ClientEntity[]>;
  findById(id: string): Promise<ClientEntity>;
  create(client: ClientEntity): Promise<ClientEntity>;
  update(id: string, client: Partial<ClientEntity>): Promise<ClientEntity>;
  delete(id: string): Promise<any>;
}
