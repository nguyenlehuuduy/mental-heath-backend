import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TypeMessageForResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nameTypeMessage: string;

  @ApiProperty()
  descriptionTypeMessage?: string;

  @ApiProperty()
  @IsNotEmpty()
  created_at: Date | string;

  @ApiProperty()
  @IsNotEmpty()
  updated_at: Date | string;
}
