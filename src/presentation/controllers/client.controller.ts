import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientService } from '../../application/use-cases/clients.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID del cliente' })
  findById(@Param('id') id: string) {
    return this.clientService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateClientDto) {
    return this.clientService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.clientService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientService.delete(id);
  }
}
