import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Viaje } from '../entities/viaje.entity';
import { CreateViajeDto } from '../dto/create-viaje.dto';
import { UpdateViajeDto } from '../dto/update-viaje.dto';

@Injectable()
export class ViajesService {
  constructor(
    @InjectRepository(Viaje)
    private readonly viajesRepository: Repository<Viaje>,
  ) {}

  async create(createViajeDto: CreateViajeDto) {
    const viaje = this.viajesRepository.create(createViajeDto);
    return this.viajesRepository.save(viaje);
  }

  findAll() {
    return this.viajesRepository.find();
  }

  async findOne(id: number) {
    const viaje = await this.viajesRepository.findOneBy({ id });
    if (!viaje)
      throw new NotFoundException(`Viaje #${id} not found`);
    return viaje;
  }

  async update(id: number, updateViajeDto: UpdateViajeDto) {
    const viaje = await this.findOne(id);
    Object.assign(viaje, updateViajeDto);
    return this.viajesRepository.save(viaje);
  }

  async remove(id: number) {
    const viaje = await this.findOne(id);
    return this.viajesRepository.remove(viaje);
  }
}
