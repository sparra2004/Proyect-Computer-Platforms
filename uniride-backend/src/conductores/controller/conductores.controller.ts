import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateConductorDto } from '../dto/create-conductore.dto';
import { ConductoresService } from '../service/conductores.service';
import { UpdateConductoreDto } from '../dto/update-conductore.dto';


@Controller('conductores')
export class ConductoresController {
  constructor(private readonly conductoresService: ConductoresService) {}

  @Post()
  create(@Body() createConductorDto: CreateConductorDto) {
    return this.conductoresService.create(createConductorDto);
  }

  @Get()
  findAll() {
    return this.conductoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conductoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConductorDto: UpdateConductoreDto) {
    return this.conductoresService.update(+id, updateConductorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conductoresService.remove(+id);
  }
}
