import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { ProductRepository } from '../../../domain/interfaces/product.repository';
import { PRODUCT_REPOSITORY } from '../../../presentation/tokens/tokens';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { CreateProductDto } from '../../../presentation/dto/product/product.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepository,
  ) {}

  async execute(data: CreateProductDto): Promise<ProductEntity> {
    const existing = await this.repository.findAll();
    const isDuplicate = existing.some((product) => product.name.toLowerCase() === data.name.toLowerCase());
    if (isDuplicate) throw new ConflictException('El producto ya existe');

    const product: ProductEntity = { ...data, _id: uuidv4() };
    return this.repository.create(product);
  }
}
