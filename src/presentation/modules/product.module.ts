import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from '../controllers/product.controller';
import { PRODUCT_REPOSITORY } from '../tokens/tokens';
import { ProductRepositoryImpl } from '../../infrastructure/database/repositories/product.repository.impl';
import { ProductDocument, ProductSchema } from '../../infrastructure/database/schemas/product.schema';
import { CreateProductUseCase } from '../../application/use-cases/product/create-product.use-case.service';
import { SellProductUseCase } from '../../application/use-cases/product/sell-product.use-case.service';
import { PaginateProductsUseCase } from '../../application/use-cases/product/paginate-products.use-case.service';
import { DeleteProductUseCase } from '../../application/use-cases/product/delete-product.use-case.service';
import { UpdateProductUseCase } from '../../application/use-cases/product/update-product.use-case.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductDocument.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [
    { provide: PRODUCT_REPOSITORY, useClass: ProductRepositoryImpl },
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    PaginateProductsUseCase,
    SellProductUseCase,
  ],
})
export class ProductModule {}
