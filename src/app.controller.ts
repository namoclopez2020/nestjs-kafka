import { Controller, Get, Post, Logger, Inject, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { SendMessageDto } from './dto/sendmessage.dto';

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
    @Body() sendMessageDto: SendMessageDto
  ) {
    return this.kafka.emit('message.created', {
      'message': sendMessageDto.message,
      'user': sendMessageDto.user
    })
  }
}
