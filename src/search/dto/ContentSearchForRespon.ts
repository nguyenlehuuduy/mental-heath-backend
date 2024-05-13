import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ImagePostForResponse } from 'src/post/dto/ImagePostForResponse';

export class ContentSearchForRespon {
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
  accountId: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  created_at: Date | string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  updated_at: Date | string;

  @ApiProperty()
  totalReaction: number;
  @ApiProperty()
  totalComment: number;
  @ApiProperty()
  totalShare: number;
  @ApiProperty({
    type: [ImagePostForResponse],
  })
  images?: Array<ImagePostForResponse>;
  is_liked?: boolean;
}
