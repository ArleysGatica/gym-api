import { Module } from '@nestjs/common';
import { ClientController } from '../controllers/client.controller';
import { ClientRepositoryImpl } from '../../infrastructure/database/repositories/client.repository.impl';
import { ClientService } from '../../application/use-cases/clients.service';
import { CLIENT_REPOSITORY } from '../tokens/tokens';

@Module({
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
