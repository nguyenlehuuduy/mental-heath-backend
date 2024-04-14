import { ApiProperty } from "@nestjs/swagger";

export class HotContentForUpdate {
  @ApiProperty({
    required: false
  })
  title?: string;

  @ApiProperty({
    required: false
  })
  thumbnailFileName?: string;

  @ApiProperty({
    required: false
  })
  url?: string;
}