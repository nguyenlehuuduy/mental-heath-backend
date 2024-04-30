import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UserForResponse } from "src/user/dto/UserForResponse";

export class RequestFollowForResponse {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  sender: UserForResponse;
  @ApiProperty()
  @IsNotEmpty()
  created_at: string | Date;
  @ApiProperty()
  @IsNotEmpty()
  updated_at: string | Date;
}
