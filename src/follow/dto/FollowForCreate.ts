import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FollowForCreate {

  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  senderId: string;

  @ApiProperty()
  @IsNotEmpty()
  reciverId: string;

  @ApiProperty()
  followerId?: string;
  @ApiProperty()
  followingId?: string;
  @ApiProperty()
  accountId?: string;
}
