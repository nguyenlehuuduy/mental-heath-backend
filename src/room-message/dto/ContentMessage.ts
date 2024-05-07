import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendMessageForPost {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty()
  @IsNotEmpty()
  contentMessage: string;

  @ApiProperty()
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty()
  @IsNotEmpty()
  updated_at: Date;
}