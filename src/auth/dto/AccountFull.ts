import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RoleForGet } from 'src/role/dto/RoleForGet';

export class AccountForFull {
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
  password?: string;

  phone?: string;
  aboutMe?: string;
  nickName?: string;
  birth?: Date;
  address?: string;
  refreshTokenJWT?: string;
  expriedTokenJWT?: Date;
  roles: Array<RoleForGet>
  created_at?: Date | string;
  updated_at?: Date | string;
}
