import { ApiProperty } from '@nestjs/swagger';

export class HotContentForResponse {
  @ApiProperty({
    required: false,
  })
  id?: string;

  @ApiProperty({
    required: false,
  })
  title?: string;

  @ApiProperty({
    required: false,
  })
  thumbnailFileName?: string;

  @ApiProperty({
    required: false,
  })
  url?: string;
}
