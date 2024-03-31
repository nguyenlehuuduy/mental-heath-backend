import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostForUpdate {
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
  //TODO: react, comment,... later
}
