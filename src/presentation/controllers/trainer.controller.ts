import { Controller, Post, Get, Param, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TrainerService } from '../../application/use-cases/trainer.service';
import { AddDiscountDto, TrainerDto, UpdateTrainerDto } from '../dto/trainer/trainer.dto';
import { v4 as uuidv4 } from 'uuid';
import { ParseObjectIdOrUuidPipe } from '../../common/pipes/parse-objectid.pipe';

@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

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
    return this.trainerService.create(trainerEntity);
  }

  @Get('getAll')
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  async getAll() {
    return this.trainerService.findAll();
  }

  @Put('add-discount/:id')
  @ApiResponse({ status: 200, description: 'Descuento agregado' })
  @ApiResponse({ status: 404, description: 'Entrenador no encontrado' })
  async addDiscount(@Param('id') id: string, @Body() dto: AddDiscountDto) {
    return this.trainerService.addDiscount(id, dto.discounts, dto.reason);
  }

  @Put('update/:id')
  @ApiResponse({ status: 200, description: 'Descuento agregado' })
  @ApiResponse({ status: 404, description: 'Entrenador no encontrado' })
  async update(@Param('id', ParseObjectIdOrUuidPipe) id: string, @Body() dto: UpdateTrainerDto) {
    return this.trainerService.update(id, dto);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'Entrenador eliminado' })
  @ApiResponse({ status: 404, description: 'Entrenador no encontrado' })
  async delete(@Param('id', ParseObjectIdOrUuidPipe) id: string) {
    return this.trainerService.delete(id);
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
    const result = await this.trainerService.payroll(id);
    if (!result) throw new NotFoundException('Entrenador no encontrado');
    return { message: 'Payroll processed successfully', trainer: result };
  }
}
