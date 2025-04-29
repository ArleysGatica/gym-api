export class ClientEntity {
  _id: string;
  name: string;
  phone: string;
  gender?: string;
  startDate?: Date;
  nextPayment?: Date | null;
  status?: string;
}
