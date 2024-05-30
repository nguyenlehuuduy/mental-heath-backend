import { ApiProperty } from '@nestjs/swagger';

export class TypeImageForUpdate {
  @ApiProperty()
  typeImageName: string;
}
