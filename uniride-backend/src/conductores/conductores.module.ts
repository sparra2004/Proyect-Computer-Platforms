import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConductoresService } from './service/conductores.service';
import { ConductoresController } from './controller/conductores.controller';
import { Conductor } from './entities/conductore.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Conductor])],
  controllers: [ConductoresController],
  providers: [ConductoresService],
})
export class ConductoresModule {}
