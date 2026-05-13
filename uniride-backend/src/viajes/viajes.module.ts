import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ViajesService } from './service/viajes.service';
import { ViajesController } from './controller/viajes.controller';
import { Viaje } from './entities/viaje.entity';
import { User } from '../users/entities/user.entity';
import { Conductor } from '../conductores/entities/conductore.entity';
import { Vehiculo } from '../vehiculos/entities/vehiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Viaje, User, Conductor, Vehiculo])],
  controllers: [ViajesController],
  providers: [ViajesService],
})
export class ViajesModule {}