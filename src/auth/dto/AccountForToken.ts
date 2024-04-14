import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/decorator/role.enum';

export class AccountForToken {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email phải đúng định dạng.' })
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  roles?: Array<Role>;
}
