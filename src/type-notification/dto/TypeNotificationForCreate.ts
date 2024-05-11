import { ApiProperty } from '@nestjs/swagger';

export class TypeNotificationForCreate {
  @ApiProperty({
    type: String,
  })
  typeName: string;

  @ApiProperty({
    type: String,
  })
  description?: string;

  @ApiProperty({
    type: String,
  })
  thumbnailNoti?: string;
}
