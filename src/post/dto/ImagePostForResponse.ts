import { ApiProperty } from '@nestjs/swagger';

export class ImagePostForResponse {
  @ApiProperty()
  accountId: string;
  @ApiProperty()
  postId: string;
  @ApiProperty()
  path: string;
}
