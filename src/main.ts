import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no declaradas
      forbidNonWhitelisted: true, // Error si llegan props no declaradas
      transform: true, // Convierte tipos automáticamente
    }),
  );

  const config = app.get(ConfigService);
  const port = config.get<number>('port') || 3000;

  await app.listen(port);
  console.log('App corriendo en el puerto ' + port);
}
bootstrap();
