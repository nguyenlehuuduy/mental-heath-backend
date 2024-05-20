import { ApiProperty } from '@nestjs/swagger';

export class TypeNotificationForUpdate {
  @ApiProperty({
    type: String,
  })
  typeName?: string;

  @ApiProperty({
    type: String,
  })
  description?: string;

  @ApiProperty({
    type: String,
  })
  thumbnailNoti?: string;
}
