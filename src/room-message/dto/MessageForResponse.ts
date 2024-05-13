import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AccountBasicForResponse } from 'src/auth/dto/AccountBasicForResponse';

export class MessageForResponse {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  ownerId: string;
  @ApiProperty()
  @IsNotEmpty()
  owner: AccountBasicForResponse;
  @ApiProperty()
  @IsNotEmpty()
  roomId: string;
  @ApiProperty()
  @IsNotEmpty()
  created_at?: Date;
  @ApiProperty()
  @IsNotEmpty()
  updated_at?: Date;
  @ApiProperty()
  @IsNotEmpty()
  contentText: string;
}
