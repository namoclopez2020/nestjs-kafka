import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({
    description: 'User name',
    example: 'UserTest'
  })
  user: string;

  @ApiProperty({
    description: 'Message to user',
    example: 'Hello user'
  })
  message: string;
}