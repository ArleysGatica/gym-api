import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: 'Nombre de usuario' })
  username: string;

  @ApiProperty({ example: 'admin123', description: 'Contraseña del usuario' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'admin', description: 'Nombre de usuario único' })
  username: string;

  @ApiProperty({
    example: 'admin123',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  password: string;

  @ApiProperty({
    example: 'admin',
    enum: ['superroot', 'admin'],
    description: 'Rol del usuario',
  })
  role: 'superroot' | 'admin';
}

export class UpdateDto extends PartialType(OmitType(RegisterDto, ['password'] as const)) {}

export class ChangePasswordDto {
  @IsString()
  @ApiProperty({ example: 'admin123', description: 'Contraseña nueva' })
  newPassword: string;
}
