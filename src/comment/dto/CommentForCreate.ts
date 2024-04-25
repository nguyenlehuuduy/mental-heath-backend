import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentForCreate {
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
  @IsString()
  postId: string;
}
