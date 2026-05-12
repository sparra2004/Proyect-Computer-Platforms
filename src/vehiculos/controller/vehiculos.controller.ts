import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateVehiculoDto } from '../dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from '../dto/update-vehiculo.dto';
import { VehiculosService } from '../service/vehiculos.service';

@Controller('vehiculos')
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Post()
  create(@Body() createVehiculoDto: CreateVehiculoDto) {
    return this.vehiculosService.create(createVehiculoDto);
  }

  @Get()
  findAll() {
    return this.vehiculosService.findAll();
  }

  @Get(':id')
  findOne(@Param('placa') placa: string) {
    return this.vehiculosService.findOne(placa);
  }

  @Patch(':placa')
  update(@Param('placa') placa: string, @Body() updateVehiculoDto: UpdateVehiculoDto) {
    return this.vehiculosService.update(placa, updateVehiculoDto);
  }

  @Delete(':id')
  remove(@Param('placa') placa: string) {
    return this.vehiculosService.remove(placa);
  }
}
