import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RoleForGet } from 'src/role/dto/RoleForGet';

export class AccountForFull {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  phone?: string;
  aboutMe?: string;
  nickName?: string;
  birth?: Date;
  address?: string;
  refreshTokenJWT?: string;
  expriedTokenJWT?: Date;
  roles: Array<RoleForGet>;
  created_at?: Date | string;
  updated_at?: Date | string;
  banner?: string;
  avata?: string;
}
