import { ApiProperty } from '@nestjs/swagger';

export class TypeNotificationForResponse {
  @ApiProperty({
    type: String,
  })
  id: string;

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
