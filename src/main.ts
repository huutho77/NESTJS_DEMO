import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  app.enableCors();

  json({ limit: '30mb' });
  urlencoded({ limit: '30mb', extended: false });

  app.setGlobalPrefix('api');

  await app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}...`);
  });
}
bootstrap();
