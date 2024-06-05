import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class TargetForResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idTargetAccount?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountId: string;
}