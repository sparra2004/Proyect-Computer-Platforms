import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';



import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './config/app.config';
import { getDatabaseConfig } from './config/database.config';
import { ViajesModule } from './viajes/viajes.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { ConductoresModule } from './conductores/conductores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    UsersModule,
    ViajesModule,
    VehiculosModule,
    ConductoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
