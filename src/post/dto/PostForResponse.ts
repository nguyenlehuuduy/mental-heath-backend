import { ApiProperty } from '@nestjs/swagger';
import { Account } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostForResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contentText: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountId: string;

  @ApiProperty()
  account?: Account;

  //TODO: react, comment,... later
}
