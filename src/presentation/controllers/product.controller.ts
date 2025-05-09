import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateProductDto, GetProductsQueryDto, SellProductDto, UpdateProductDto } from '../dto/product/product.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ParseObjectIdOrUuidPipe } from '../../common/pipes/parse-objectid.pipe';
import { CreateProductUseCase } from '../../application/use-cases/product/create-product.use-case.service';
import { UpdateProductUseCase } from '../../application/use-cases/product/update-product.use-case.service';
import { DeleteProductUseCase } from '../../application/use-cases/product/delete-product.use-case.service';
import { PaginateProductsUseCase } from '../../application/use-cases/product/paginate-products.use-case.service';
import { SellProductUseCase } from '../../application/use-cases/product/sell-product.use-case.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly paginateProductsUseCase: PaginateProductsUseCase,
    private readonly sellProductUseCase: SellProductUseCase,
  ) {}

  @Post('create')
  @ApiResponse({ status: 201, description: ' Producto creado' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async create(@Body() dto: CreateProductDto) {
    const p = {
      ...dto,
      name: dto.name,
      price: dto.price,
      stock: dto.stock,
      category: dto.category,
    };
    return this.createProductUseCase.execute(p);
  }

  @Get('getAllPaginated')
  @ApiResponse({ status: 200, description: 'Lista de productos' })
  async getAll(@Query() query: GetProductsQueryDto) {
    const skip = Number(query.skip ?? 0);
    const limit = Number(query.limit ?? 10);

    return this.paginateProductsUseCase.execute(skip, limit, query.search, query.category);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Producto actualizado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async update(@Param('id', ParseObjectIdOrUuidPipe) id: string, @Body() dto: UpdateProductDto) {
    return this.updateProductUseCase.execute(id, dto);
  }

  @Patch('sell')
  @ApiResponse({ status: 200, description: 'Producto vendido' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async sell(@Body() dto: SellProductDto) {
    return this.sellProductUseCase.execute(dto.productId, dto.quantity);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Producto eliminado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async delete(@Param('id', ParseObjectIdOrUuidPipe) id: string) {
    return this.deleteProductUseCase.execute(id);
  }
}
