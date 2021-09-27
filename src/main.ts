import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

const PORT = process.env.PORT;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  json({ limit: '30mb' });
  urlencoded({ limit: '30mb', extended: false });

  app.setGlobalPrefix('api');

  await app.listen(PORT);
}
bootstrap();
