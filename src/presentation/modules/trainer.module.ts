import { Module } from '@nestjs/common';
import { TrainerController } from '../controllers/trainer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TRAINER_REPOSITORY } from '../tokens/tokens';
import { TrainerRepositoryImpl } from '../../infrastructure/database/repositories/trainer.repository.impl';
import { TrainerDocument, TrainerSchema } from '../../infrastructure/database/schemas/trainer.schema';
import { CreateTrainerUseCase } from '../../application/use-cases/trainer/create-trainer.use-case.service';
import { FindAllTrainersUseCase } from '../../application/use-cases/trainer/find-all-trainers.use-case.service';
import { UpdateTrainerUseCase } from '../../application/use-cases/trainer/update-trainer.use-case.service';
import { DeleteTrainerUseCase } from '../../application/use-cases/trainer/delete-trainer.use-case.service';
import { AddDiscountUseCase } from '../../application/use-cases/trainer/add-discount.use-case.service';
import { ProcessPayrollUseCase } from '../../application/use-cases/trainer/process-payroll.use-case.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TrainerDocument.name, schema: TrainerSchema }])],
  controllers: [TrainerController],
  providers: [
    { provide: TRAINER_REPOSITORY, useClass: TrainerRepositoryImpl },
    CreateTrainerUseCase,
    FindAllTrainersUseCase,
    UpdateTrainerUseCase,
    DeleteTrainerUseCase,
    AddDiscountUseCase,
    ProcessPayrollUseCase,
  ],
})
export class TrainerModule {}
