import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { ChangePasswordDto, LoginDto, RegisterDto, UpdateDto } from '../dto/auth/login.dto';
import { ParseObjectIdOrUuidPipe } from '../../common/pipes/parse-objectid.pipe';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RegisterUserUseCase } from '../../application/use-cases/auth/register-user.use-case.service';
import { ValidateUserUseCase } from '../../application/use-cases/auth/validate-user.use-case.service';
import { LoginUserUseCase } from '../../application/use-cases/auth/login-user.use-case.service';
import { UpdateUserUseCase } from '../../application/use-cases/auth/update-user.use-case.service';
import { DeleteUserUseCase } from '../../application/use-cases/auth/delete-user.use-case.service';
import { ChangePasswordUseCase } from '../../application/use-cases/auth/change-password.use-case.service';
import { FindAllUsersUseCase } from '../../application/use-cases/auth/find-all-users.use-case.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly validateUser: ValidateUserUseCase,
    private readonly loginUser: LoginUserUseCase,
    private readonly findAllUsers: FindAllUsersUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly changePasswords: ChangePasswordUseCase,
  ) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Usuario registrado' })
  @ApiResponse({ status: 409, description: 'Usuario ya existe' })
  async register(@Body() dto: RegisterDto) {
    return this.registerUser.execute(dto);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() dto: LoginDto) {
    const user = await this.validateUser.execute(dto.username, dto.password);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return this.loginUser.execute(user);
  }

  @Get('getAll')
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  getAll() {
    return this.findAllUsers.execute();
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async delete(@Param('id', ParseObjectIdOrUuidPipe) id: string) {
    return this.deleteUser.execute(id);
  }

  @Put('update/:id')
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async update(@Param('id', ParseObjectIdOrUuidPipe) id: string, @Body() dto: UpdateDto) {
    return this.updateUser.execute(id, dto);
  }

  @Put(':id/change-password')
  @ApiResponse({ status: 200, description: 'Contraseña actualizada' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async changePassword(@Param('id', ParseObjectIdOrUuidPipe) id: string, @Body() dto: ChangePasswordDto) {
    return this.changePasswords.execute(id, dto.newPassword);
  }
}
