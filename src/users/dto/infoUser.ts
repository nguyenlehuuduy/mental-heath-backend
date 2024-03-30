import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InfoUser {
  id: string;
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  password: string;

  phone: string;
  aboutMe: string;
  nickName: string;
  birth: Date;
  address: string;
  refreshTokenJWT: string;
  expriedTokenJWT: Date;
  created_at: Date | string;
  updated_at: Date | string;
}
