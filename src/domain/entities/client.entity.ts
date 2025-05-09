export class ClientEntity {
  constructor(
    public readonly _id: string,
    public name: string,
    public phone: string,
    public gender: string,
    public startDate: Date,
    public nextPayment: Date | null,
    public status: string,
    public daysOverdue: number,
    public daysRemaining: number,
    public paymentAmount: number,
  ) {}
}
