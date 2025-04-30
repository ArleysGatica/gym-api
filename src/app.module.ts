import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientModule } from './presentation/modules/client.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './presentation/modules/auth.module';

@Module({
  imports: [DatabaseModule, ClientModule, AuthModule],
  providers: [AppService],
})
export class AppModule {}
