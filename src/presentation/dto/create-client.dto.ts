import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Arleys', description: 'Nombre del cliente' })
  name: string;

  @ApiProperty({ example: 'Masculino', description: 'Género del cliente' })
  gender: string;

  @ApiProperty({ example: '3112345678', description: 'Teléfono de contacto' })
  phone: string;
}
