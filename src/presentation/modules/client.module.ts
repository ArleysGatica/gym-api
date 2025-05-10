import { Module } from '@nestjs/common';
import { ClientController } from '../controllers/client.controller';
import { ClientRepositoryImpl } from '../../infrastructure/database/repositories/client.repository.impl';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientDocument, ClientSchema } from '../../infrastructure/database/schemas/client.schema';
import { CLIENT_REPOSITORY } from '../tokens/tokens';
import { CreateClientUseCase } from '../../application/use-cases/client/create-client.use-case.service';
import { PaginateClientsUseCase } from '../../application/use-cases/client/paginate-clients.use-case.service';
import { DeleteClientUseCase } from '../../application/use-cases/client/delete-client.use-case.service';
import { UpdateClientUseCase } from '../../application/use-cases/client/update-client.use-case.service';
import { FindClientUseCase } from '../../application/use-cases/client/find-client.use-case.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClientDocument.name,
        schema: ClientSchema,
      },
    ]),
  ],
  controllers: [ClientController],
  providers: [
    { provide: CLIENT_REPOSITORY, useClass: ClientRepositoryImpl },
    CreateClientUseCase,
    FindClientUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,
    PaginateClientsUseCase,
  ],
})
export class ClientModule {}
