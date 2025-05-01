import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from '../../application/use-cases/product.service';
import {
  CreateProductDto,
  GetProductsQueryDto,
  SellProductDto,
  UpdateProductDto,
} from '../dto/product/product.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(private readonly ProductUseCase: ProductService) {}

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
    return this.ProductUseCase.create(p);
  }

  @Get('getAllPaginated')
  @ApiResponse({ status: 200, description: 'Lista de productos' })
  async getAll(@Query() query: GetProductsQueryDto) {
    const skip = Number(query.skip ?? 0);
    const limit = Number(query.limit ?? 10);
    return this.ProductUseCase.getAllPaginated(skip, limit);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Producto actualizado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.ProductUseCase.update(id, dto);
  }

  @Patch('sell')
  @ApiResponse({ status: 200, description: 'Producto vendido' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async sell(@Body() dto: SellProductDto) {
    return this.ProductUseCase.sellProduct(dto.productId, dto.quantity);
  }
}
