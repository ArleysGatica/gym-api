import { TrainerEntity } from '../../../domain/entities/trainer.entity';
import { TrainerDocument } from '../schemas/trainer.schema';

export interface TrainerPersistence {
  _id: string;
  name: string;
  position: string;
  baseSalary: number;
  netSalary: number;
  history: {
    discounts: number;
    reason: string;
  }[];
}

export class TrainerMapper {
  static toDomain(doc: TrainerDocument): TrainerEntity {
    return new TrainerEntity(doc._id, doc.name, doc.position, doc.baseSalary, doc.netSalary, doc.history);
  }

  static toPersistence(entity: TrainerEntity): TrainerPersistence {
    return {
      _id: entity._id,
      name: entity.name,
      position: entity.position,
      baseSalary: entity.baseSalary,
      netSalary: entity.netSalary,
      history: entity.history,
    };
  }
}
