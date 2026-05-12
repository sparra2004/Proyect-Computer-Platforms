import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conductor } from '../entities/conductore.entity';
import { CreateConductorDto } from '../dto/create-conductore.dto';
import { UpdateConductoreDto } from '../dto/update-conductore.dto';


@Injectable()
export class ConductoresService {
  constructor(
    @InjectRepository(Conductor)
    private readonly conductoresRepository: Repository<Conductor>,
  ) {}

  async create(createConductorDto: CreateConductorDto) {
    const telefonoExists = await this.conductoresRepository.findOneBy({
      telefono: createConductorDto.telefono,
    });

    if (telefonoExists)
      throw new ConflictException(
        `Telefono ${createConductorDto.telefono} already in use`,
      );

    const conductor = this.conductoresRepository.create(createConductorDto);
    return this.conductoresRepository.save(conductor);
  }

  findAll() {
    return this.conductoresRepository.find();
  }

  async findOne(id: number) {
    const conductor = await this.conductoresRepository.findOneBy({ id });
    if (!conductor)
      throw new NotFoundException(`Conductor #${id} not found`);
    return conductor;
  }

  async update(id: number, updateConductorDto: UpdateConductoreDto) {
    const conductor = await this.findOne(id);
    Object.assign(conductor, updateConductorDto);
    return this.conductoresRepository.save(conductor);
  }

  async remove(id: number) {
    const conductor = await this.findOne(id);
    return this.conductoresRepository.remove(conductor);
  }
}
