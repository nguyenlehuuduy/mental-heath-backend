import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RoomChatBotForGet {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  created_at: Date;
  @ApiProperty()
  @IsNotEmpty()
  updated_at: Date;
  @ApiProperty()
  @IsNotEmpty()
  nameRoom?: string;
}
