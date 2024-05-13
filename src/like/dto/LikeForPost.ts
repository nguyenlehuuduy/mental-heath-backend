import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LikeForPost {
  @ApiProperty()
  @IsNotEmpty()
  postId: string;
}
