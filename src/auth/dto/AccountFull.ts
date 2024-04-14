import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RoleForGet } from 'src/role/dto/RoleForGet';

export class AccountForFull {
  @ApiProperty({
    type: String,
  })
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

  @ApiProperty({
    type: String,
  })
  phone?: string;

  @ApiProperty({
    type: String,
  })
  aboutMe?: string;

  @ApiProperty({
    type: String,
  })
  nickName?: string;

  @ApiProperty({
    type: Date,
  })
  birth?: Date;

  @ApiProperty({
    type: String,
  })
  address?: string;

  @ApiProperty({
    type: String,
  })
  refreshTokenJWT?: string;

  @ApiProperty({
    type: Date,
  })
  expriedTokenJWT?: Date;

  @ApiProperty({
    type: [RoleForGet],
  })
  roles: Array<RoleForGet>
  @ApiProperty({
    type: Date,
  })
  created_at?: Date | string;
  @ApiProperty({
    type: Date,
  })
  updated_at?: Date | string;
}
