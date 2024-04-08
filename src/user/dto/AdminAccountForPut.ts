import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminAccountForPut {
  @ApiProperty()
  @IsNotEmpty()
  idAccount: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idRoleAdmin: string;
}
