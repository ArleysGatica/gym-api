import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

class Discount {
  @IsNumber()
  @ApiProperty({ example: 100, description: 'Valor del descuento' })
  discounts: number;

  @ApiProperty({
    example: 'Por llegar tarde',
    description: 'Razón del descuento',
  })
  reason: string;
}

export class TrainerDto {
  @IsString()
  @ApiProperty({ example: 'arleysgatica', description: 'Nombre del usuario' })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'entrenador',
    description: 'Posición del entrenador',
  })
  position: string;

  @IsNumber()
  @ApiProperty({ example: 1000, description: 'Salario base del entrenador' })
  baseSalary: number;

  @IsNumber()
  @ApiProperty({ example: 1000, description: 'Salario neto del entrenador' })
  netSalary: number;
}

export class AddDiscountDto extends Discount {}

export class UpdateTrainerDto extends OmitType(TrainerDto, ['netSalary']) {
  @IsString()
  @ApiProperty({
    example: 'John Doe',
    description: 'Actualizar Nombre del usuario',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'entrenador',
    description: 'Actualizar posición del entrenador',
  })
  position: string;

  @IsNumber()
  @ApiProperty({ example: 1000, description: 'Salario base del entrenador' })
  baseSalary: number;
}
