import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { TrainerService } from '../../application/use-cases/trainer.service';
import {
  AddDiscountDto,
  TrainerDto,
  UpdateTrainerDto,
} from '../dto/trainer/trainer.dto';
import { generateUniqueId } from '../../utils/generate-unique-id';

@ApiTags('Trainer')
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
      _id: generateUniqueId(),
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
  async update(@Param('id') id: string, @Body() dto: UpdateTrainerDto) {
    return this.trainerService.update(id, dto);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'Entrenador eliminado' })
  @ApiResponse({ status: 404, description: 'Entrenador no encontrado' })
  async delete(@Param('id') id: string) {
    return this.trainerService.delete(id);
  }
}
