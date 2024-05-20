import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendMessageForPost {
  @ApiProperty()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty()
  @IsNotEmpty()
  contentMessage: string;

  @ApiProperty()
  typeMessageId: string;
}
