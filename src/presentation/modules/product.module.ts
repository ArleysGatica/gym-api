import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../../application/use-cases/product.service';
import { PRODUCT_REPOSITORY } from '../tokens/tokens';
import { ProductRepositoryImpl } from '../../infrastructure/database/repositories/product.repository.impl';
import {
  ProductDocument,
  ProductSchema,
} from '../../infrastructure/database/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductDocument.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepositoryImpl,
    },
  ],
})
export class ProductModule {}
