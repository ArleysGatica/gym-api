import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../../application/use-cases/auth.service';

import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginDto, RegisterDto, UpdateDto } from '../dto/auth/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'JWT generado' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.authService.login(user);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.registerOrDuplicate(registerDto);
  }

  @Get('getAll')
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  async getAll() {
    return this.authService.findAll();
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async delete(@Param('id') id: string) {
    const user = await this.authService.findById(id);
    console.log(user.id === id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.authService.delete(id);
    return user;
  }

  @Put('update/:id')
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async update(@Param('id') id: string, @Body() user: UpdateDto) {
    const userEntity = await this.authService.findById(id);
    if (!userEntity) {
      throw new NotFoundException('Usuario no encontrado');
    }

    userEntity.username = user.username;
    userEntity.role = user.role;

    return this.authService.update(id, userEntity);
  }
}
