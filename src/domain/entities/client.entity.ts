export class ClientEntity {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  startDate: Date;
  nextPayment: Date;
  status: 'active' | 'inactive';
  email?: string;
  address?: string;
}
