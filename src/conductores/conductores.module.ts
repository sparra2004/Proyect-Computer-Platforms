import { Module } from '@nestjs/common';
import { ConductoresController } from './controller/conductores.controller';
import { ConductoresService } from './service/conductores.service';


@Module({
  controllers: [ConductoresController],
  providers: [ConductoresService],
})
export class ConductoresModule {}
