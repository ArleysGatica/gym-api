import { Body, Controller, Get, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { ClientService } from '../../application/use-cases/clients.service';
import { CreateClientDto, GetClientsQueryDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ParseObjectIdOrUuidPipe } from '../../common/pipes/parse-objectid.pipe';

@ApiTags('Clientes')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('create')
  @ApiResponse({ status: 201, description: 'Cliente creado' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  create(@Body() dto: CreateClientDto) {
    const c = {
      ...dto,
      name: dto.name,
      gender: dto.gender,
      phone: dto.phone,
      paymentAmount: dto.paymentAmount,
      startDate: dto.startDate,
      nextPayment: dto.nextPayment,
    };
    return this.clientService.create(c);
  }

  @Get('getAllPaginated')
  @ApiResponse({ status: 200, description: 'Lista de clientes' })
  async getAll(@Query() query: GetClientsQueryDto) {
    const skip = Number(query.skip ?? 0);
    const limit = Number(query.limit ?? 10);

    return this.clientService.getAllPaginated(skip, limit, query.search);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  findById(@Param('id', ParseObjectIdOrUuidPipe) id: string) {
    return this.clientService.findById(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Cliente actualizado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  update(@Param('id', ParseObjectIdOrUuidPipe) id: string, @Body() dto: UpdateClientDto) {
    return this.clientService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Cliente eliminado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  delete(@Param('id', ParseObjectIdOrUuidPipe) id: string) {
    return this.clientService.delete(id);
  }
}
