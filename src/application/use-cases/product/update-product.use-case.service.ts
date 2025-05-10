import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/interfaces/product.repository';
import { PRODUCT_REPOSITORY } from '../../../presentation/tokens/tokens';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepository,
  ) {}

  async execute(id: string, dto: Partial<ProductEntity>) {
    const product = await this.repository.findById(id);
    if (!product) throw new NotFoundException('Producto no encontrado');
    return this.repository.update(id, dto);
  }
}
