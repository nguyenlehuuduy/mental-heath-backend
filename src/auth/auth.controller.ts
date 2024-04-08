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
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { Role } from 'src/decorator/role.enum';
import { Action } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CheckAbilities } from 'src/decorator/abilities.decorator';
import { AccountForToken } from './dto/AccountForToken';
import { AbilitiesGuard } from 'src/guard/ability.guard';

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

  @ApiBearerAuth('Authorization')
  //define role can be assgined of end point
  @Roles(Role.User)
  //authen token in request and check role of request and role define in end point
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Get('/profile')
  //define permision which user can do in this API
  @CheckAbilities({ action: Action.Read, subject: AccountForToken })
  //check permision of account in request and permission in API
  @UseGuards(AbilitiesGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
