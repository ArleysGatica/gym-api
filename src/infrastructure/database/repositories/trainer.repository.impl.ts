import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TrainerRepository } from '../../../domain/interfaces/trainer.repository';
import { TrainerEntity } from '../../../domain/entities/trainer.entity';
import { TrainerDocument } from '../schemas/trainer.schema';
import { TrainerMapper } from '../mappers/trainer.mapper';

@Injectable()
export class TrainerRepositoryImpl implements TrainerRepository {
  constructor(@InjectModel(TrainerDocument.name) private readonly trainerModel: Model<TrainerDocument>) {}

  async create(trainer: TrainerEntity): Promise<TrainerEntity> {
    const created = await this.trainerModel.create(TrainerMapper.toPersistence(trainer));
    return TrainerMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    const result = await this.trainerModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Trainer not found');
  }

  async findAll(): Promise<TrainerEntity[]> {
    const docs = await this.trainerModel.find().exec();
    return docs.map(TrainerMapper.toDomain);
  }

  async findById(id: string): Promise<TrainerEntity | null> {
    const doc = await this.trainerModel.findById(id).exec();
    return doc ? TrainerMapper.toDomain(doc) : null;
  }

  async update(id: string, updates: Partial<TrainerEntity>): Promise<TrainerEntity> {
    const updated = await this.trainerModel
      .findByIdAndUpdate(id, TrainerMapper.toPersistence(updates as TrainerEntity), { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Trainer not found');
    return TrainerMapper.toDomain(updated);
  }
}
