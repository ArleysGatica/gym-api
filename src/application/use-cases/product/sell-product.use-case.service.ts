import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ProductRepository } from '../../../domain/interfaces/product.repository';
import { PRODUCT_REPOSITORY } from '../../../presentation/tokens/tokens';

@Injectable()
export class SellProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepository,
  ) {}

  async execute(id: string, quantity: number) {
    if (quantity <= 0) {
      throw new BadRequestException('Cantidad inválida');
    }

    return this.repository.reduceStock(id, quantity);
  }
}
