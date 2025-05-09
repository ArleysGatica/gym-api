import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TRAINER_REPOSITORY } from '../../../presentation/tokens/tokens';
import { TrainerRepository } from '../../../domain/interfaces/trainer.repository';

@Injectable()
export class AddDiscountUseCase {
  constructor(
    @Inject(TRAINER_REPOSITORY)
    private readonly repository: TrainerRepository,
  ) {}

  async execute(id: string, discount: number, reason: string) {
    const trainer = await this.repository.findById(id);
    if (!trainer) throw new NotFoundException('Entrenador no encontrado');

    const newHistory = [...trainer.history, { discounts: discount, reason }];
    const newNetSalary = trainer.baseSalary - newHistory.reduce((sum, h) => sum + h.discounts, 0);

    return this.repository.update(id, {
      history: newHistory,
      netSalary: newNetSalary,
    });
  }
}
