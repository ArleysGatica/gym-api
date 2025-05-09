import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ClientEntity } from '../../../domain/entities/client.entity';
import { ClientRepository } from '../../../domain/interfaces/client.repository';
import { ClientDocument } from '../schemas/client.schema';
import { ClientMapper } from '../mappers/client.mapper';

@Injectable()
export class ClientRepositoryImpl implements ClientRepository {
  constructor(
    @InjectModel(ClientDocument.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async findAll(): Promise<ClientEntity[]> {
    const docs = await this.clientModel.find().exec();
    return docs.map(ClientMapper.toDomain);
  }

  async findById(id: string): Promise<ClientEntity> {
    const doc = await this.clientModel.findById(id).exec();
    return doc ? ClientMapper.toDomain(doc) : null;
  }

  async create(client: ClientEntity): Promise<ClientEntity> {
    const created = await this.clientModel.create(ClientMapper.toPersistence(client));
    return ClientMapper.toDomain(created);
  }

  async update(id: string, client: Partial<ClientEntity>): Promise<ClientEntity> {
    const doc = await this.clientModel.findByIdAndUpdate(id, client, { new: true }).exec();
    if (!doc) throw new NotFoundException('Cliente no encontrado');
    return ClientMapper.toDomain(doc);
  }

  async delete(id: string): Promise<any> {
    const result = await this.clientModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Cliente no encontrado');
    return result;
  }

  async findAllPaginated(
    skip = 0,
    limit = 10,
    search?: string,
  ): Promise<{
    data: ClientEntity[];
    total: number;
    appliedFilters: {
      search?: string;
      category?: string;
      skip: number;
      limit: number;
    };
  }> {
    const filter: any = {};

    if (search) {
      filter.name = { $regex: new RegExp(search, 'i') };
    }

    // 🔍 Traer todos los resultados que coincidan (filtro global)
    const filtered = await this.clientModel.find(filter).lean().exec();
    const total = filtered.length;

    // ⚠️ Proteger contra skip inválido
    if (skip >= total) {
      skip = 0;
    }

    // ✂️ Paginar en memoria
    const paginated = filtered.slice(skip, skip + limit);

    return {
      data: paginated.map(ClientMapper.toDomain),
      total,
      appliedFilters: {
        search,
        skip,
        limit,
      },
    };
  }
}
