import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TRAINER_REPOSITORY } from '../../../presentation/tokens/tokens';
import { TrainerRepository } from '../../../domain/interfaces/trainer.repository';
import { TrainerEntity } from '../../../domain/entities/trainer.entity';

@Injectable()
export class ProcessPayrollUseCase {
  constructor(
    @Inject(TRAINER_REPOSITORY)
    private readonly repository: TrainerRepository,
  ) {}

  async execute(id: string): Promise<TrainerEntity> {
    const trainer = await this.repository.findById(id);
    if (!trainer) throw new NotFoundException('Entrenador no encontrado');

    const updated: Partial<TrainerEntity> = {
      netSalary: trainer.baseSalary,
      history: [],
    };

    return this.repository.update(id, updated);
  }
}
