import { ApiProperty } from '@nestjs/swagger';

export class FeatureForPost {
  @ApiProperty({
    required: false,
  })
  name: string;

  @ApiProperty({
    required: false,
  })
  thumbnailFileName: string;

  @ApiProperty({
    required: false,
  })
  url: string;
}
