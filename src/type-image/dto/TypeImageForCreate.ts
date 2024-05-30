import { ApiProperty } from '@nestjs/swagger';

export class TypeImageForCreate {
  @ApiProperty()
  typeImageName: string;
}
