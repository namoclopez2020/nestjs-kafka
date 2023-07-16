import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'Kafka',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            consumer: {
              groupId: 'kafka-consumer',
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
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
