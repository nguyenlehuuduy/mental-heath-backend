import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RoleForPost {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  nameRole: string;

  @ApiProperty({
    type: String,
  })
  descriptionRole: string;
}
