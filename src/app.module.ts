import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientModule } from './presentation/modules/client.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './presentation/modules/auth.module';
import { TrainerModule } from './presentation/modules/trainer.module';
import { ProductModule } from './presentation/modules/product.module';

@Module({
  imports: [
    DatabaseModule,
    ClientModule,
    AuthModule,
    TrainerModule,
    ProductModule,
  ],
  providers: [AppService],
})
export class AppModule {}
