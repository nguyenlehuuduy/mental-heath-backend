import { ApiProperty } from '@nestjs/swagger';

export class TabMenuForUpdate {
  @ApiProperty({
    required: false,
  })
  name?: string;

  @ApiProperty({
    required: false,
  })
  iconUrl?: string;

  @ApiProperty({
    required: false,
  })
  url?: string;
}
