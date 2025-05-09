import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../../domain/interfaces/product.repository';
import { PRODUCT_REPOSITORY } from '../../../presentation/tokens/tokens';

@Injectable()
export class PaginateProductsUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepository,
  ) {}

  execute(skip: number, limit: number, search?: string, category?: string) {
    return this.repository.findAllPaginated(skip, limit, search, category);
  }
}
