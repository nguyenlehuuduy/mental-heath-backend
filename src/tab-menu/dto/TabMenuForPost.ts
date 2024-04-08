import { ApiProperty } from "@nestjs/swagger";

export class TabMenuForPost {
  @ApiProperty({
    required: false
  })
  name?: string;

  @ApiProperty({
    required: false
  })
  iconUrl?: string;

  @ApiProperty({
    required: false
  })
  url?: string;
}