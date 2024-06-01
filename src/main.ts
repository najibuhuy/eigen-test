import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(new ValidationPipe())

  const optSwagger = new DocumentBuilder()
  .setTitle("ELibrary Sytem Eigen Test Challenge")
  .setDescription("Backend service for application ELibrary Sytem Eigen Test Challenge")
  .setVersion("1.0.0")
  .build();

  const document = SwaggerModule.createDocument(app, optSwagger);
  SwaggerModule.setup('docs', app, document)

  await app.listen(configService.get('NODE_PORT'));
  Logger.log(`Listening on port: ${configService.get('NODE_PORT')}`);

}
bootstrap();
