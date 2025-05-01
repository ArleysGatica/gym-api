export class ProductEntity {
  constructor(
    public readonly _id: string,
    public name: string,
    public price: number,
    public stock: number,
    public category: string,
  ) {}
}
