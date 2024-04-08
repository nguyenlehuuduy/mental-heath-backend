import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RoleForGet {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  nameRole: string;

  @ApiProperty({
    type: String,
  })
  descriptionRole: string;

  @ApiProperty({
    type: Date,
  })
  created_at: Date;

  @ApiProperty({
    type: Date,
  })
  updated_at: Date;
}
