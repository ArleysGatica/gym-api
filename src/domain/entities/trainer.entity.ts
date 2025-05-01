export class TrainerEntity {
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
