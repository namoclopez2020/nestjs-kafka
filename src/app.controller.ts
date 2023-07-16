import { Controller, Get, Post, Logger, Inject, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('Kafka')
    private readonly kafka: ClientProxy
  ) {}

  @MessagePattern('message.created')
  public messageCreate(@Payload() payload: any){
    Logger.log(payload, AppController.name)
  }

  @Post('/send')
  public sendMessage(
    @Body('message') message: string,
    @Body('user') user: string
  ) {
    return this.kafka.emit('message.created', {
      message, 
      user
    })
  }
}
