import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductDocument } from '../schemas/product.schema';

export interface ProductPersistence {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export class ProductMapper {
  static toDomain(doc: ProductDocument): ProductEntity {
    return new ProductEntity(
      doc._id,
      doc.name,
      doc.price,
      doc.stock,
      doc.category,
    );
  }

  static toPersistence(entity: ProductEntity): ProductPersistence {
    return {
      _id: entity._id,
      name: entity.name,
      price: entity.price,
      stock: entity.stock,
      category: entity.category,
    };
  }
}
