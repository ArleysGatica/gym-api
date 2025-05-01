import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsOptional,
  IsPositive,
  Min,
  IsMongoId,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'Laptop' })
  name: string;

  @ApiProperty({ description: 'The price of the product', example: 999.99 })
  price: number;

  @ApiProperty({
    description: 'The stock quantity of the product',
    example: 50,
  })
  stock: number;

  @ApiProperty({
    description: 'The category of the product',
    example: 'Electronics',
  })
  category: string;
}

export class UpdateProductDto extends OmitType(CreateProductDto, ['category']) {
  @ApiProperty({
    description: 'Actualizar el stock del producto',
    example: 56,
  })
  stock: number;

  @ApiProperty({
    description: 'Actualizar el nombre del producto',
    example: 'Laptop',
  })
  name: string;

  @ApiProperty({
    description: 'Actualizar el precio del producto',
    example: 999.0,
  })
  price: number;
}

export class SellProductDto {
  @IsMongoId()
  @ApiProperty({
    description: 'Id del producto',
    example: '5f8d9f1d2',
  })
  productId: string;

  @IsPositive()
  @ApiProperty({
    description: 'Cantidad a vender',
    example: 56,
  })
  quantity: number;
}

export class GetProductsQueryDto {
  @IsOptional()
  @Min(0)
  @ApiProperty({ description: 'Cantidad a minima', example: 1 })
  skip?: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'Cantidad a maxima', example: 10 })
  limit?: number;

  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Filtro por Nombre',
    example: 'Electronics',
    required: false,
  })
  search?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Filtro por categoria',
    example: 'Electronics',
    required: false,
  })
  category?: string;
}
