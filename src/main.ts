import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      consumer: {
        groupId: 'kakfa-consumer',
      },
      client: {
        brokers: [configService.get('KAFKA_BROKERS')],
        ssl: true,
        sasl: {
          mechanism: 'plain',
          username: configService.get('KAFKA_USERNAME'),
          password: configService.get('KAFKA_PASSWORD'),
        },
      },
    }
  } as MicroserviceOptions)

  app.startAllMicroservices()
  
  await app.listen(3000);
}
bootstrap();
