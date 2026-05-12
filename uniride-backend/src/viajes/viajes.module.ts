import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ViajesService } from './service/viajes.service';
import { ViajesController } from './controller/viajes.controller';
import { Viaje } from './entities/viaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Viaje])],
  controllers: [ViajesController],
  providers: [ViajesService],
})
export class ViajesModule {}
