import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ProductRepository } from '../../domain/interfaces/product.repository';
import { PRODUCT_REPOSITORY } from '../../presentation/tokens/tokens';
import { ProductEntity } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../presentation/dto/product/product.dto';
import { generateUniqueId } from '../../utils/generate-unique-id';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepository,
  ) {}

  async create(data: CreateProductDto): Promise<ProductEntity> {
    const existingProduct = await this.repository.findAll();
    const isDuplicate = existingProduct.some(
      (product) => product.name.toLowerCase() === data.name.toLowerCase(),
    );

    if (isDuplicate) {
      throw new ConflictException('El producto ya existe');
    }

    const product: ProductEntity = {
      ...data,
      _id: generateUniqueId(),
    };
    return this.repository.create(product);
  }

  findAll() {
    return this.repository.findAll();
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  update(
    id: string,
    product: Partial<ProductEntity>,
  ): Promise<Pick<ProductEntity, 'name' | 'price' | 'stock'>> {
    const products = this.repository.findById(id);
    if (!products) throw new Error('Product not found');
    return this.repository.update(id, product);
  }

  async sellProduct(id: string, quantity: number): Promise<ProductEntity> {
    if (quantity <= 0) {
      throw new BadRequestException('Cantidad inválida');
    }

    return this.repository.reduceStock(id, quantity);
  }

  async getAllPaginated(skip: number, limit: number) {
    return this.repository.findAllPaginated(skip, limit);
  }
}
