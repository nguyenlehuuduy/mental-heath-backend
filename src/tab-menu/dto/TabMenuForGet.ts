import { ApiProperty } from "@nestjs/swagger";

export class TabMenuForGet {
  @ApiProperty({
    required: false
  })
  id?: string;

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