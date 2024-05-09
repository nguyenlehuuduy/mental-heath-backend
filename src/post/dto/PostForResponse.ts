import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationAndFilter } from 'src/common/schema/pagination';
import { UserForResponse } from 'src/user/dto/UserForResponse';
import { ImagePostForResponse } from './ImagePostForResponse';

export class PostForResponse {
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
  account: UserForResponse;

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

export class PostForFullResponse {
  @ApiProperty({
    type: [PostForResponse],
  })
  data: Array<PostForResponse>;
  @ApiProperty({
    required: false,
  })
  pagination: PaginationAndFilter;
}
