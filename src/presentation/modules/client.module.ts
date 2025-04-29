// presentation/modules/client.module.ts
import { Module } from '@nestjs/common';
import { ClientController } from '../controllers/client.controller';
import { ClientService } from '../../application/use-cases/clients.service';
import { ClientRepositoryImpl } from '../../infrastructure/database/repositories/client.repository.impl';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from '../../infrastructure/database/schemas/client.schema';
import { CLIENT_REPOSITORY } from '../tokens/tokens';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]),
  ],
  controllers: [ClientController],
  providers: [
    ClientService,
    {
      provide: CLIENT_REPOSITORY,
      useClass: ClientRepositoryImpl,
    },
  ],
})
export class ClientModule {}
