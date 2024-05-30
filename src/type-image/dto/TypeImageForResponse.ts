import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TypeImageForResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  typeImageName: string;

  @ApiProperty()
  @IsNotEmpty()
  created_at: Date | string;

  @ApiProperty()
  @IsNotEmpty()
  updated_at: Date | string;
}
