import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RoomMessageForPost {
  @ApiProperty()
  @IsNotEmpty()
  accountInRoom: Array<string>;
}
