import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AccountForLoginResponse {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  idAccount: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  access_token: string;
}
