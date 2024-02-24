import { IsEmail, IsNotEmpty } from "class-validator";

export class AccountForPost {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: "Email phải đúng định dạng." })
  email: string;

  @IsNotEmpty()
  password: string;

  myself: string;
}
