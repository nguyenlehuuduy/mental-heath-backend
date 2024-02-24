import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AccountForPost } from "./dto/AccountForPost";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  async register(@Body() accountForPost: AccountForPost) {
    console.log("loading to create account...");
    return this.authService.register(accountForPost);
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() req, @Body() accountLogin: { email: string; password: string }) {
    console.log("loading to login...");
    return await this.authService.login(req.user.id, accountLogin.email);
  }
}
