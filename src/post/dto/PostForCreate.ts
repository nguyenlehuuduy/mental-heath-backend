import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostForCreate {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contentText: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountId: string;

  @ApiProperty()
  imagePaths?: Array<string>;
}

export class ImageUploadForPost {
  accountId: string;
  path: string;
  typeImageId?: string;
}
