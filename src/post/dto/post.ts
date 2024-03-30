import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class PostDto {
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
  @IsNotEmpty()
  @IsDate()
  created_at: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  updated_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  permissionPostId: string | null;
}
