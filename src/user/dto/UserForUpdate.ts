import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UserForUpdate {
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
  phone: string;

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
  @IsDateString()
  birth: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
}
