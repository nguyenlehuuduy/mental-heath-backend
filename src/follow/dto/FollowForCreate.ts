import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FollowForCreate {
  @ApiProperty()
  @IsNotEmpty()
  senderId: string;

  @ApiProperty()
  @IsNotEmpty()
  reciverId: string;
}
