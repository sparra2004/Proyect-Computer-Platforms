import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Viaje } from '../entities/viaje.entity';
import { CreateViajeDto } from '../dto/create-viaje.dto';
import { UpdateViajeDto } from '../dto/update-viaje.dto';
import { User } from '../../users/entities/user.entity';
import { Conductor } from '../../conductores/entities/conductore.entity';
import { Vehiculo } from '../../vehiculos/entities/vehiculo.entity';

@Injectable()
export class ViajesService {
  constructor(
    @InjectRepository(Viaje)
    private readonly viajesRepository: Repository<Viaje>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Conductor)
    private readonly conductoresRepository: Repository<Conductor>,
    @InjectRepository(Vehiculo)
    private readonly vehiculosRepository: Repository<Vehiculo>,
  ) {}

  async create(createViajeDto: CreateViajeDto) {
    const user = await this.usersRepository.findOneBy({ id: createViajeDto.user_id });
    const conductor = await this.conductoresRepository.findOneBy({ id: createViajeDto.conductor_id });
    const vehiculo = await this.vehiculosRepository.findOneBy({ placa: createViajeDto.vehiculo_id });

    const viaje = this.viajesRepository.create({
      inicio: createViajeDto.inicio,
      final: createViajeDto.final,
      fecha: createViajeDto.fecha,
      hora: createViajeDto.hora,
      user: user!,
      conductor: conductor!,
      vehiculo: vehiculo!,
    });
    return this.viajesRepository.save(viaje);
  }

  findAll() {
    return this.viajesRepository.find({
      relations: ['user', 'conductor', 'vehiculo'],
    });
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