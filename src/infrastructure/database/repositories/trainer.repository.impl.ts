import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TrainerRepository } from '../../../domain/interfaces/trainer.repository';
import { TrainerEntity } from '../../../domain/entities/trainer.entity';

@Injectable()
export class TrainerRepositoryImpl implements TrainerRepository {
  constructor(
    @InjectModel('Trainer') private readonly trainerModel: Model<TrainerEntity>,
  ) {}

  async delete(id: string): Promise<void> {
    const result = await this.trainerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new Error('Trainer not found');
    }
  }

  async create(trainer: TrainerEntity): Promise<TrainerEntity> {
    const created = new this.trainerModel(trainer);
    return created.save();
  }

  async findAll(): Promise<TrainerEntity[]> {
    return this.trainerModel.find().exec();
  }

  async findById(id: string): Promise<TrainerEntity | null> {
    return this.trainerModel.findById(id).exec();
  }

  async update(
    id: string,
    updates: Partial<TrainerEntity>,
  ): Promise<TrainerEntity> {
    const trainer = await this.findById(id);
    if (!trainer) throw new Error('Trainer not found');
    return this.trainerModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
  }
}
