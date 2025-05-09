import { Inject, Injectable } from '@nestjs/common';
import { TRAINER_REPOSITORY } from '../../../presentation/tokens/tokens';
import { TrainerRepository } from '../../../domain/interfaces/trainer.repository';

@Injectable()
export class FindAllTrainersUseCase {
  constructor(
    @Inject(TRAINER_REPOSITORY)
    private readonly repository: TrainerRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
