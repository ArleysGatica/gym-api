export class TrainerEntity {
  constructor(
    public readonly _id: string,
    public name: string,
    public position: string,
    public baseSalary: number,
    public netSalary: number,
    public history: {
      discounts: number;
      reason: string;
    }[],
  ) {}
}
