import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccountSearchForResponse {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  aboutMe: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
  avata: string;
}
