import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsMongoId, IsString, IsNumber, IsDate, IsPositive, Min } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'Arleys', description: 'Nombre del cliente' })
  name: string;

  @ApiProperty({ example: 'Masculino', description: 'Género del cliente' })
  gender: string;

  @ApiProperty({ example: '3112345678', description: 'Teléfono de contacto' })
  phone: string;

  @IsNumber()
  @ApiProperty({ example: 100, description: 'Monto del pago' })
  paymentAmount: number;

  @IsDate()
  @ApiProperty({ example: '2023-01-01', description: 'Fecha de inicio del pago' })
  startDate: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ example: '2023-01-01', description: 'Fecha de vencimiento del pago' })
  nextPayment: Date;
}

export class GetClientsQueryDto {
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
}
