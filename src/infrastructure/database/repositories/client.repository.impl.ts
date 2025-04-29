import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ClientEntity } from '../../../domain/entities/client.entity';
import { ClientRepository } from '../../../domain/interfaces/client.repository';

@Injectable()
export class ClientRepositoryImpl implements ClientRepository {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<ClientEntity>,
  ) {}

  async findAll(): Promise<ClientEntity[]> {
    return this.clientModel.find().exec();
  }

  async findById(id: string): Promise<ClientEntity> {
    return this.clientModel.findById(id).exec();
  }

  async create(client: ClientEntity): Promise<ClientEntity> {
    const created = new this.clientModel(client);
    return created.save();
  }

  async update(
    id: string,
    client: Partial<ClientEntity>,
  ): Promise<ClientEntity> {
    return this.clientModel.findByIdAndUpdate(id, client, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.clientModel.findByIdAndDelete(id).exec();
  }
}
