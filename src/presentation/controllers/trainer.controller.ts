import { Controller, Post, Get, Param, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { ApiResponse, ApiParam } from '@nestjs/swagger';
import { AddDiscountDto, TrainerDto, UpdateTrainerDto } from '../dto/trainer/trainer.dto';
import { v4 as uuidv4 } from 'uuid';
import { ParseObjectIdOrUuidPipe } from '../../common/pipes/parse-objectid.pipe';
import { CreateTrainerUseCase } from '../../application/use-cases/trainer/create-trainer.use-case.service';
import { FindAllTrainersUseCase } from '../../application/use-cases/trainer/find-all-trainers.use-case.service';
import { UpdateTrainerUseCase } from '../../application/use-cases/trainer/update-trainer.use-case.service';
import { DeleteTrainerUseCase } from '../../application/use-cases/trainer/delete-trainer.use-case.service';
import { AddDiscountUseCase } from '../../application/use-cases/trainer/add-discount.use-case.service';
import { ProcessPayrollUseCase } from '../../application/use-cases/trainer/process-payroll.use-case.service';

@Controller('trainer')
export class TrainerController {
  constructor(
    private readonly createTrainerUseCase: CreateTrainerUseCase,
    private readonly findAllTrainersUseCase: FindAllTrainersUseCase,
    private readonly updateTrainerUseCase: UpdateTrainerUseCase,
    private readonly deleteTrainerUseCase: DeleteTrainerUseCase,
    private readonly addDiscountUseCase: AddDiscountUseCase,
    private readonly processPayrollUseCase: ProcessPayrollUseCase,
  ) {}

  @Post('create')
  @ApiResponse({ status: 201, description: 'Entrenador creado' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Post('create')
  async create(@Body() trainer: TrainerDto) {
    const trainerEntity = {
      ...trainer,
      _id: uuidv4(),
      history: [],
    };
    return this.createTrainerUseCase.execute(trainerEntity);
  }

  @Get('getAll')
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  async getAll() {
    return this.findAllTrainersUseCase.execute();
  }

  @Put('add-discount/:id')
  @ApiResponse({ status: 200, description: 'Descuento agregado' })
  @ApiResponse({ status: 404, description: 'Entrenador no encontrado' })
  async addDiscount(@Param('id') id: string, @Body() dto: AddDiscountDto) {
    return this.addDiscountUseCase.execute(id, dto.discounts, dto.reason);
  }

  @Put('update/:id')
  @ApiResponse({ status: 200, description: 'Descuento agregado' })
  @ApiResponse({ status: 404, description: 'Entrenador no encontrado' })
  async update(@Param('id', ParseObjectIdOrUuidPipe) id: string, @Body() dto: UpdateTrainerDto) {
    return this.updateTrainerUseCase.execute(id, dto);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'Entrenador eliminado' })
  @ApiResponse({ status: 404, description: 'Entrenador no encontrado' })
  async delete(@Param('id', ParseObjectIdOrUuidPipe) id: string) {
    return this.deleteTrainerUseCase.execute(id);
  }

  @Post(':id/payroll')
  @ApiResponse({ status: 200, description: 'Entrenador pagado' })
  @ApiResponse({ status: 404, description: 'Entrenador no encontrado' })
  @ApiParam({
    name: 'id',
    description: 'ID del entrenador',
    type: String,
    example: '663c8fddc84c9f0b90a5e413',
  })
  async payroll(@Param('id', ParseObjectIdOrUuidPipe) id: string) {
    const result = await this.processPayrollUseCase.execute(id);
    if (!result) throw new NotFoundException('Entrenador no encontrado');
    return { message: 'Payroll processed successfully', trainer: result };
  }
}
