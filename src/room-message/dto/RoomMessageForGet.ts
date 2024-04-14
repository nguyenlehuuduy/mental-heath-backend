import { AccountForToken } from "src/auth/dto/AccountForToken";

export class RoomMessageForGet {
  id: string;
  created_at: Date;
  updated_at: Date;
  accountInRoom: Array<AccountForToken>;
  nameRoom?: string;
}
