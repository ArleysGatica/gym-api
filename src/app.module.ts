import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientModule } from './presentation/modules/client.module';

@Module({
  imports: [ClientModule],
  providers: [AppService],
})
export class AppModule {}
