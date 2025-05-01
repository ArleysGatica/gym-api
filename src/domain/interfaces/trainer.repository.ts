import { TrainerEntity } from '../entities/trainer.entity';

export abstract class TrainerRepository {
  abstract create(trainer: TrainerEntity): Promise<TrainerEntity>;
  abstract findAll(): Promise<TrainerEntity[]>;
  abstract findById(id: string): Promise<TrainerEntity | null>;
  abstract update(
    id: string,
    updates: Partial<TrainerEntity>,
  ): Promise<TrainerEntity>;
  abstract delete(id: string): Promise<void>;
}
