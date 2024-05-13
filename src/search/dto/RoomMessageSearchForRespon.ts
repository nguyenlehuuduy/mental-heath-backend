import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AccountForToken } from 'src/auth/dto/AccountForToken';

export class RoomMessageSearchForRespon {
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
  accountInRoom: Array<AccountForToken>;

  @ApiProperty()
  @IsNotEmpty()
  nameRoom?: string;
}
