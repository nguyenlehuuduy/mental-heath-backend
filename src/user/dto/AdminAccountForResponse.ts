import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RoleForGet } from 'src/role/dto/RoleForGet';

export class AdminAccountForResponse {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  roles: Array<RoleForGet>;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  updated_at: Date;

}
