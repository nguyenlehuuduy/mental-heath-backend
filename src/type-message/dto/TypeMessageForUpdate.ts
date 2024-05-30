import { ApiProperty } from '@nestjs/swagger';

export class TypeMessageForUpdate {
  @ApiProperty({
    type: String,
  })
  nameTypeMessage?: string;

  @ApiProperty({
    type: String,
  })
  descriptionTypeMessage?: string;

}
