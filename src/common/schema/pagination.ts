import { ApiProperty } from '@nestjs/swagger';

export class PaginationAndFilter {
  @ApiProperty({
    required: false,
  })
  pageNo?: number;

  @ApiProperty({
    required: false,
  })
  limit?: number;

  @ApiProperty({
    required: false,
  })
  totalPage?: number;

  @ApiProperty({
    required: false,
  })
  totalRecord?: number;

  @ApiProperty({
    required: false,
  })
  sortBy?: string;

  @ApiProperty({
    required: false,
  })
  orderBy?: string;
}
