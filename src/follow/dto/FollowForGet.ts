import { ApiProperty } from "@nestjs/swagger";
import { UserForResponse } from "src/user/dto/UserForResponse";

export class FollowForGet {
  @ApiProperty()
  id: string;
  @ApiProperty()
  senderId: string;
  @ApiProperty()
  sender: UserForResponse;
  @ApiProperty()
  reciver: UserForResponse;
  @ApiProperty()
  reciverId: string;
  @ApiProperty()
  updated_at?: Date;
  @ApiProperty()
  created_at?: Date;
}
