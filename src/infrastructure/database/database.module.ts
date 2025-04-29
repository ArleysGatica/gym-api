// src/infrastructure/database/database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoStatusService } from './db';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const isProduction =
          configService.get<string>('NODE_ENV') === 'production';
        const uri = isProduction
          ? configService.get<string>('MONGO_URI')
          : configService.get<string>('MONGO_LOCAL_URI');

        return {
          uri,
          dbName: configService.get<string>('MONGO_DB_NAME') || 'gymdb',
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MongoStatusService],
})
export class DatabaseModule {}
