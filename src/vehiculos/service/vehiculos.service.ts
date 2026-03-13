import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from '../entities/vehiculo.entity';
import { CreateVehiculoDto } from '../dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from '../dto/update-vehiculo.dto';

@Injectable()
export class VehiculosService {
  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculosRepository: Repository<Vehiculo>,
  ) {}

  async create(createVehiculoDto: CreateVehiculoDto) {
    const placaExists = await this.vehiculosRepository.findOneBy({
      placa: createVehiculoDto.placa,
    });

    if (placaExists)
      throw new ConflictException(
        `Vehiculo with placa ${createVehiculoDto.placa} already exists`,
      );

    const vehiculo = this.vehiculosRepository.create(createVehiculoDto);
    return this.vehiculosRepository.save(vehiculo);
  }

  findAll() {
    return this.vehiculosRepository.find();
  }

  async findOne(id: number) {
    const vehiculo = await this.vehiculosRepository.findOneBy({ id });
    if (!vehiculo)
      throw new NotFoundException(`Vehiculo #${id} not found`);
    return vehiculo;
  }

  async update(id: number, updateVehiculoDto: UpdateVehiculoDto) {
    const vehiculo = await this.findOne(id);
    Object.assign(vehiculo, updateVehiculoDto);
    return this.vehiculosRepository.save(vehiculo);
  }

  async remove(id: number) {
    const vehiculo = await this.findOne(id);
    return this.vehiculosRepository.remove(vehiculo);
  }
}
