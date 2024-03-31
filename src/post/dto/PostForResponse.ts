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

  @ApiProperty()
  @IsNotEmpty()
  created_at: Date | string;

  @ApiProperty()
  @IsNotEmpty()
  updated_at: Date | string;

  @ApiProperty()
  totalReaction: number;
  @ApiProperty()
  totalComment: number;
  @ApiProperty()
  totalShare: number;
  //TODO: react, comment,... later
}
