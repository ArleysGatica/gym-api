import { ClientEntity } from '../../../domain/entities/client.entity';
import { ClientDocument } from '../schemas/client.schema';

export interface ClientPersistence {
  _id: string;
  name: string;
  phone: string;
  gender: string;
  startDate: Date;
  nextPayment: Date;
  status: string;
  daysOverdue: number;
  daysRemaining: number;
  paymentAmount: number;
}

export class ClientMapper {
  static toDomain(doc: ClientDocument): ClientEntity {
    return new ClientEntity(
      doc._id,
      doc.name,
      doc.phone,
      doc.gender,
      doc.startDate,
      doc.nextPayment,
      doc.status,
      doc.daysOverdue,
      doc.daysRemaining,
      doc.paymentAmount,
    );
  }

  static toPersistence(entity: ClientPersistence): ClientPersistence {
    return {
      _id: entity._id,
      name: entity.name,
      phone: entity.phone,
      gender: entity.gender,
      startDate: entity.startDate,
      nextPayment: entity.nextPayment,
      status: entity.status,
      daysOverdue: entity.daysOverdue,
      daysRemaining: entity.daysRemaining,
      paymentAmount: entity.paymentAmount,
    };
  }
}
