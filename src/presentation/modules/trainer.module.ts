import { Module } from '@nestjs/common';
import { TrainerController } from '../controllers/trainer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerService } from '../../application/use-cases/trainer.service';
import { TRAINER_REPOSITORY } from '../tokens/tokens';
import { TrainerRepositoryImpl } from '../../infrastructure/database/repositories/trainer.repository.impl';
import { TrainerSchema } from '../../infrastructure/database/schemas/trainer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Trainer', schema: TrainerSchema }]),
  ],
  controllers: [TrainerController],
  providers: [
    TrainerService,
    {
      provide: TRAINER_REPOSITORY,
      useClass: TrainerRepositoryImpl,
    },
  ],
})
export class TrainerModule {}
