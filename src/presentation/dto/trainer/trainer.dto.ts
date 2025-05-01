import { ApiProperty, OmitType } from '@nestjs/swagger';

class Discount {
  @ApiProperty({ example: 100, description: 'Valor del descuento' })
  discounts: number;

  @ApiProperty({
    example: 'Por llegar tarde',
    description: 'Razón del descuento',
  })
  reason: string;
}

export class TrainerDto {
  @ApiProperty({ example: 'arleysgatica', description: 'Nombre del usuario' })
  name: string;

  @ApiProperty({
    example: 'entrenador',
    description: 'Posición del entrenador',
  })
  position: string;

  @ApiProperty({ example: 1000, description: 'Salario base del entrenador' })
  baseSalary: number;

  @ApiProperty({ example: 1000, description: 'Salario neto del entrenador' })
  netSalary: number;
}

export class AddDiscountDto extends Discount {}

export class UpdateTrainerDto extends OmitType(TrainerDto, ['netSalary']) {
  @ApiProperty({
    example: 'John Doe',
    description: 'Actualizar Nombre del usuario',
  })
  name: string;

  @ApiProperty({
    example: 'entrenador',
    description: 'Actualizar posición del entrenador',
  })
  position: string;

  @ApiProperty({ example: 1000, description: 'Salario base del entrenador' })
  baseSalary: number;
}
