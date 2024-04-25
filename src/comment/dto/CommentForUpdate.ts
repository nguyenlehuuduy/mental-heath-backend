import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentForUpdate {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contentCmt: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountId: string;
}
