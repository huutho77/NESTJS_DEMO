import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import { join } from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const PORT_HTTP = +process.env.PORT_HTTP;
  const PORT_HTTPS = +process.env.PORT_HTTPS;

  // app.setGlobalPrefix('api');
  // app.enableCors();
  // json({ limit: '30mb' });
  // urlencoded({ limit: '30mb', extended: false });

  // await app.listen(PORT, () => {
  //   console.log(`Server listening on PORT ${PORT}...`);
  // });

  /**
   * Test run multiple simultaneous servers
   * Use HTTP and HTTPS protocol
   */
  const httpsOptions = {
    key: fs.readFileSync(join(__dirname, '../secret_keys/private-key.pem'), 'utf8'),
    cert: fs.readFileSync(join(__dirname, '../secret_keys/cert.pem'), 'utf8')
  };
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.setGlobalPrefix('api');
  app.enableCors();
  express.json({ limit: '30mb' });
  express.urlencoded({ limit: '30mb', extended: true });

  // Just init when setup route already done
  await app.init();

  http.createServer(server).listen(PORT_HTTP, () => {
    console.log(`Server running on http://localhost:${PORT_HTTP}/api ...`);
  });
  https.createServer(httpsOptions, server).listen(PORT_HTTPS, () => {
    console.log(`Server running on https://localhost:${PORT_HTTPS}/api ...`);
  });
}
bootstrap();
