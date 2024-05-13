import { ApiProperty } from '@nestjs/swagger';

export class ImageForAvt {
  @ApiProperty()
  id: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  typeImageId: string;
}

export class TypeImage {
  @ApiProperty()
  id: string;

  @ApiProperty()
  typeImageName: string;
}
