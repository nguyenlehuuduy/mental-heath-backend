import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTypeNotification {
  @IsString()
  typeName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    required: false,
  })
  thumbnailNoti?: string;
}