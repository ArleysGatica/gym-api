import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { TRAINER_REPOSITORY } from '../../../presentation/tokens/tokens';
import { TrainerRepository } from '../../../domain/interfaces/trainer.repository';
import { TrainerEntity } from '../../../domain/entities/trainer.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateTrainerUseCase {
  constructor(
    @Inject(TRAINER_REPOSITORY)
    private readonly repository: TrainerRepository,
  ) {}

  async execute(data: TrainerEntity): Promise<TrainerEntity> {
    const existing = await this.repository.findAll();
    const isDuplicate = existing.some((trainer) => trainer.name.toLowerCase() === data.name.toLowerCase());

    if (isDuplicate) {
      throw new ConflictException('Este usuario ya existe con el mismo nombre');
    }

    const totalDiscounts = data.history?.reduce((acc, item) => acc + item.discounts, 0) ?? 0;

    const trainer: TrainerEntity = {
      ...data,
      _id: uuidv4(),
      history: [],
      netSalary: data.baseSalary - totalDiscounts,
    };

    return this.repository.create(trainer);
  }
}
