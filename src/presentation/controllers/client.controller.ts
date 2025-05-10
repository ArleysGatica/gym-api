import { Body, Controller, Get, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { CreateClientDto, GetClientsQueryDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ParseObjectIdOrUuidPipe } from '../../common/pipes/parse-objectid.pipe';
import { CreateClientUseCase } from '../../application/use-cases/client/create-client.use-case.service';
import { FindClientUseCase } from '../../application/use-cases/client/find-client.use-case.service';
import { UpdateClientUseCase } from '../../application/use-cases/client/update-client.use-case.service';
import { DeleteClientUseCase } from '../../application/use-cases/client/delete-client.use-case.service';
import { PaginateClientsUseCase } from '../../application/use-cases/client/paginate-clients.use-case.service';

@ApiTags('Clientes')
@Controller('clients')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly findClientUseCase: FindClientUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
    private readonly paginateClientsUseCase: PaginateClientsUseCase,
  ) {}

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
    return this.createClientUseCase.execute(c);
  }

  @Get('getAllPaginated')
  @ApiResponse({ status: 200, description: 'Lista de clientes' })
  async getAll(@Query() query: GetClientsQueryDto) {
    const skip = Number(query.skip ?? 0);
    const limit = Number(query.limit ?? 10);

    return this.paginateClientsUseCase.execute(skip, limit, query.search);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  findById(@Param('id', ParseObjectIdOrUuidPipe) id: string) {
    return this.findClientUseCase.execute(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Cliente actualizado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  update(@Param('id', ParseObjectIdOrUuidPipe) id: string, @Body() dto: UpdateClientDto) {
    return this.updateClientUseCase.execute(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Cliente eliminado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  delete(@Param('id', ParseObjectIdOrUuidPipe) id: string) {
    return this.deleteClientUseCase.execute(id);
  }
}
