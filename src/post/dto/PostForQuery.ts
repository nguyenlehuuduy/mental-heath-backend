import { ApiProperty } from '@nestjs/swagger';

export class PostForQuery {
  @ApiProperty()
  limit?: number;

  @ApiProperty()
  pageNo?: number;

  @ApiProperty()
  sortBy?: string;

  @ApiProperty()
  orderBy?: string;

  @ApiProperty()
  contentTextKey?: string;

  @ApiProperty()
  nameAccountKey?: string;

  @ApiProperty()
  emailAccountKey?: string;

  @ApiProperty()
  createdDateFrom?: string;

  @ApiProperty()
  createdDateTo?: string;
}
