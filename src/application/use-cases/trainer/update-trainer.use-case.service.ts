import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TRAINER_REPOSITORY } from '../../../presentation/tokens/tokens';
import { TrainerRepository } from '../../../domain/interfaces/trainer.repository';
import { TrainerEntity } from '../../../domain/entities/trainer.entity';

@Injectable()
export class UpdateTrainerUseCase {
  constructor(
    @Inject(TRAINER_REPOSITORY)
    private readonly repository: TrainerRepository,
  ) {}

  async execute(
    id: string,
    data: Partial<TrainerEntity>,
  ): Promise<Pick<TrainerEntity, 'name' | 'position' | 'baseSalary'>> {
    const trainer = await this.repository.findById(id);
    if (!trainer) throw new NotFoundException('Entrenador no encontrado');
    return this.repository.update(id, data);
  }
}
