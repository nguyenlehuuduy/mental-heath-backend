import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TargetForUpdate {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idTargetAccount?: string;
  
}