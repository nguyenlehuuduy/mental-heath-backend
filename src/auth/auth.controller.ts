import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AccountForLogin } from './dto/AccountForLogin';
import { AccountForPost } from './dto/AccountForPost';
import { LocalAuthGuard } from './local-auth.guard';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  @ApiBody({ type: AccountForPost })
  async register(@Body() accountForPost: AccountForPost) {
    console.log('step1: loading to create account...');
    return this.authService.register(accountForPost);
  }

  @ApiBody({ type: AccountForLogin })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    console.log('loading to login...');
    return await this.authService.login(req.user);
  }

  @Get('/profile')
  @ApiBearerAuth('Authorization')
  getProfile(@Request() req) {
    return req.user;
  }
}
