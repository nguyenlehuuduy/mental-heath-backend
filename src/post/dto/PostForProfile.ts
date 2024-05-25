import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ImagePostForResponse } from './ImagePostForResponse';

export class AccountCommentForPostResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  avata: string;

  @ApiProperty()
  @IsNotEmpty()
  fullName: string;
}
export class AccountForPost {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  avata: string;
}

export class CommentForPostResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contentCmt: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  account: AccountCommentForPostResponse;

  @ApiProperty()
  @IsNotEmpty()
  created_at: Date | string;

  @ApiProperty()
  @IsNotEmpty()
  updated_at: Date | string;
}

export class PostOfAccountForResponse {
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
  account: AccountForPost;

  @ApiProperty()
  comments: Array<CommentForPostResponse>;

  @ApiProperty()
  totalReaction: number;
  @ApiProperty()
  totalComment: number;
  @ApiProperty()
  totalShare: number;
  @ApiProperty({
    type: () => [ImagePostForResponse],
  })
  images?: Array<ImagePostForResponse>;
  is_liked?: boolean;
  @ApiProperty({ type: Date })
  @IsNotEmpty()
  created_at: Date | string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  updated_at: Date | string;
}
