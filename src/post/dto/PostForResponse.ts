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
  accountId: string;

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
  @ApiProperty()
  comment_recent?: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    content: string;
  }>;
  all_comment?: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    updated_at: string;
    content: string;
  }>;
  all_like_info?: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    updated_at: string;
  }>;
  all_share_info?: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    updated_at: string;
  }>;
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
