import { Module } from '@nestjs/common';
import { AuthService } from '../../application/use-cases/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserRepositoryImpl } from '../../infrastructure/database/repositories/user.repository.impl';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LOGIN_REPOSITORY } from '../tokens/tokens';
import { AuthSchema } from '../../infrastructure/database/schemas/auth.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: 'User', schema: AuthSchema }]),

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
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: LOGIN_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class AuthModule {}
