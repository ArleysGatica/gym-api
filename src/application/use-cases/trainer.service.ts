import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { TrainerRepository } from '../../domain/interfaces/trainer.repository';
import { TrainerEntity } from '../../domain/entities/trainer.entity';
import { TRAINER_REPOSITORY } from '../../presentation/tokens/tokens';

@Injectable()
export class TrainerService {
  constructor(
    @Inject(TRAINER_REPOSITORY)
    private readonly repository: TrainerRepository,
  ) {}

  async create(data: TrainerEntity) {
    const existingTrainer = await this.repository.findAll();
    const isDuplicate = existingTrainer.some(
      (trainer) => trainer.name.toLowerCase() === data.name.toLowerCase(),
    );

    if (isDuplicate) {
      throw new ConflictException(
        'A trainer with the same name already exists',
      );
    }

    const totalDiscounts =
      data.history?.reduce((acc, item) => acc + item.discounts, 0) ?? 0;

    const trainer: TrainerEntity = {
      ...data,
      history: [],
      netSalary: data.baseSalary - totalDiscounts,
    };
    return this.repository.create(trainer);
  }

  findAll() {
    return this.repository.findAll();
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  update(
    id: string,
    data: Partial<TrainerEntity>,
  ): Promise<Pick<TrainerEntity, 'name' | 'position' | 'baseSalary'>> {
    const trainer = this.repository.findById(id);
    if (!trainer) throw new Error('Trainer not found');
    return this.repository.update(id, data);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }

  async addDiscount(id: string, discount: number, reason: string) {
    const trainer = await this.repository.findById(id);
    if (!trainer) throw new Error('Trainer not found');

    const newHistory = [...trainer.history, { discounts: discount, reason }];

    const newNetSalary =
      trainer.baseSalary - newHistory.reduce((sum, h) => sum + h.discounts, 0);

    return this.repository.update(id, {
      history: newHistory,
      netSalary: newNetSalary,
    });
  }
}
