import { ApiProperty } from '@nestjs/swagger';

export class TypeMessageForCreate {
  @ApiProperty({
    type: String,
  })
  nameTypeMessage: string;

  @ApiProperty({
    type: String,
  })
  descriptionTypeMessage?: string;
}
