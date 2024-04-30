import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ImageForResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fieldname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  originalname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  size: string;

  @ApiProperty()
  @IsNotEmpty()
  filename: string;

  @ApiProperty()
  @IsNotEmpty()
  mimetype: string;
}
