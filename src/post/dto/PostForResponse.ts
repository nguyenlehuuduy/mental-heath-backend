import { ApiProperty } from '@nestjs/swagger';
import { Account } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationAndFilter } from 'src/common/schema/pagination';
import { UserForResponse } from 'src/user/dto/UserForResponse';

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
  //TODO: react, comment,... later
}

export class PostForFullResponse {
  @ApiProperty({
    type: [PostForResponse]
  })
  data: Array<PostForResponse>;
  @ApiProperty({
    required: false
  })
  pagination: PaginationAndFilter
}
