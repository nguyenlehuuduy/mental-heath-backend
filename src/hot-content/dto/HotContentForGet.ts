import { ApiProperty } from "@nestjs/swagger";

export class HotContentForGet {
  @ApiProperty({
    required: false
  })
  id?: string;

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