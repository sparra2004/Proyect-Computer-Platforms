import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions =>
  ({
    type: configService.get<string>('database.type', 'sqlite'),
    database: configService.get<string>('database.database', 'database.sqlite'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    // synchronize: false en producción — usa migraciones

    // Para PostgreSQL / MySQL descomenta:
    // host:     configService.get<string>('database.host'),
    // port:     configService.get<number>('database.port'),
    // username: configService.get<string>('database.username'),
    // password: configService.get<string>('database.password'),
  }) as TypeOrmModuleOptions;
