import { ProductEntity } from '../entities/product.entity';

export interface ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity>;
  findAll(): Promise<ProductEntity[]>;
  findById(id: string): Promise<ProductEntity | null>;
  update(id: string, product: Partial<ProductEntity>): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
  reduceStock(productId: string, quantity: number): Promise<ProductEntity>;
  findAllPaginated(
    skip: number,
    limit: number,
  ): Promise<{ data: ProductEntity[]; total: number }>;
}
