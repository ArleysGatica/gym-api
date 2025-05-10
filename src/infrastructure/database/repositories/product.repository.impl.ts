import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductRepository } from '../../../domain/interfaces/product.repository';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductDocument } from '../schemas/product.schema';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectModel(ProductDocument.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(product: ProductEntity): Promise<ProductEntity> {
    const doc = await this.productModel.create(ProductMapper.toPersistence(product));
    return ProductMapper.toDomain(doc);
  }

  async findAll(): Promise<ProductEntity[]> {
    const docs = await this.productModel.find().exec();
    return docs.map(ProductMapper.toDomain);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const doc = await this.productModel.findById(id).exec();
    return doc ? ProductMapper.toDomain(doc) : null;
  }

  async update(id: string, product: Partial<ProductEntity>): Promise<ProductEntity> {
    const doc = await this.productModel
      .findByIdAndUpdate(id, ProductMapper.toPersistence(product as ProductEntity), { new: true })
      .exec();
    if (!doc) throw new NotFoundException('Producto no encontrado');
    return ProductMapper.toDomain(doc);
  }

  async delete(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Producto no encontrado');
  }

  async reduceStock(productId: string, quantity: number): Promise<ProductEntity> {
    const updated = await this.productModel.findOneAndUpdate(
      {
        _id: productId,
        stock: { $gte: quantity },
      },
      {
        $inc: { stock: -quantity },
      },
      { new: true },
    );

    if (!updated) {
      throw new ConflictException('Stock insuficiente o producto no encontrado');
    }

    return ProductMapper.toDomain(updated);
  }

  async findAllPaginated(
    skip = 0,
    limit = 10,
    search?: string,
    category?: string,
  ): Promise<{
    data: ProductEntity[];
    total: number;
    appliedFilters: {
      search?: string;
      category?: string;
      skip: number;
      limit: number;
    };
  }> {
    const filter: any = {};

    if (search) {
      filter.name = { $regex: new RegExp(search, 'i') };
    }

    if (category) {
      filter.category = category;
    }

    // 🔍 Traer todos los resultados que coincidan (filtro global)
    const filtered = await this.productModel.find(filter).lean().exec();
    const total = filtered.length;

    // ⚠️ Proteger contra skip inválido
    if (skip >= total) {
      skip = 0;
    }

    // ✂️ Paginar en memoria
    const paginated = filtered.slice(skip, skip + limit);

    return {
      data: paginated.map(ProductMapper.toDomain),
      total,
      appliedFilters: {
        search,
        category,
        skip,
        limit,
      },
    };
  }
}
