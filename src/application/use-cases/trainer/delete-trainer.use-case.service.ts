import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TRAINER_REPOSITORY } from '../../../presentation/tokens/tokens';
import { TrainerRepository } from '../../../domain/interfaces/trainer.repository';

@Injectable()
export class DeleteTrainerUseCase {
  constructor(
    @Inject(TRAINER_REPOSITORY)
    private readonly repository: TrainerRepository,
  ) {}

  async execute(id: string) {
    const trainer = await this.repository.findById(id);
    if (!trainer) throw new NotFoundException('Trainer not found');
    return this.repository.delete(id);
  }
}
