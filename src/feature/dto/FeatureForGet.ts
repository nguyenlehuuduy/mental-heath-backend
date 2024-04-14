import { ApiProperty } from '@nestjs/swagger';

export class FeatureForGet {
  @ApiProperty({
    required: false,
  })
  id?: string;

  @ApiProperty({
    required: false,
  })
  name?: string;

  @ApiProperty({
    required: false,
  })
  thumbnailFileName?: string;

  @ApiProperty({
    required: false,
  })
  url?: string;
}
