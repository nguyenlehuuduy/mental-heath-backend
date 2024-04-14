import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentForResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contentCmt: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountId: string;

  @ApiProperty()
  @IsNotEmpty()
  created_at: Date | string;

  @ApiProperty()
  @IsNotEmpty()
  updated_at: Date | string;
}
