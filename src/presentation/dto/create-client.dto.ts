// export class CreateClientDto {
//   name: string;
//   gender: 'male' | 'female' | 'other';
//   phone: string;
//   startDate: Date;
//   nextPayment: Date;
//   status: 'active' | 'inactive';
//   email?: string;
//   address?: string;
// }

import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Arleys', description: 'Nombre del cliente' })
  name: string;

  @ApiProperty({
    example: 'gatica@gmail.com',
    description: 'Correo electrónico del cliente',
  })
  email: string;

  @ApiProperty({ example: '3112345678', description: 'Teléfono de contacto' })
  phone: string;
}
