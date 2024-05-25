import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Profile {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  aboutMe: string;

  @ApiProperty()
  nickName: string;

  @ApiProperty()
  birth: Date;

  @ApiProperty()
  address: string;

  @ApiProperty()
  avata: string;

}
