import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RoomBotInfForResponse {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  nameRoom: string;
  @ApiProperty()
  @IsNotEmpty()
  created_at: Date;
  @ApiProperty()
  @IsNotEmpty()
  accountInRoom: Array<{
    fullName: string;
    id: string;
    nickName: string;
    avata: string;
  }>;
}
