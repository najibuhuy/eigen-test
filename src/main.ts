import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(configService.get('NODE_PORT'));
  Logger.log(`Listening on port: ${configService.get('NODE_PORT')}`);

}
bootstrap();
