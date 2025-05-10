import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { UserRepositoryImpl } from '../../infrastructure/database/repositories/user.repository.impl';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LOGIN_REPOSITORY } from '../tokens/tokens';
import { AuthSchema, UserDocument } from '../../infrastructure/database/schemas/auth.schema';
import { PassportModule } from '@nestjs/passport';
import { RegisterUserUseCase } from '../../application/use-cases/auth/register-user.use-case.service';
import { ValidateUserUseCase } from '../../application/use-cases/auth/validate-user.use-case.service';
import { LoginUserUseCase } from '../../application/use-cases/auth/login-user.use-case.service';
import { FindAllUsersUseCase } from '../../application/use-cases/auth/find-all-users.use-case.service';
import { UpdateUserUseCase } from '../../application/use-cases/auth/update-user.use-case.service';
import { DeleteUserUseCase } from '../../application/use-cases/auth/delete-user.use-case.service';
import { ChangePasswordUseCase } from '../../application/use-cases/auth/change-password.use-case.service';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: UserDocument.name, schema: AuthSchema }]),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: LOGIN_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    RegisterUserUseCase,
    ValidateUserUseCase,
    LoginUserUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    ChangePasswordUseCase,
  ],
})
export class AuthModule {}
