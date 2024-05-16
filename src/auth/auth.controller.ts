import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Action } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CheckAbilities } from 'src/decorator/abilities.decorator';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { AuthService } from './auth.service';
import { AccountForLogin } from './dto/AccountForLogin';
import { AccountForLoginResponse } from './dto/AccountForLoginResponse';
import { AccountForPost } from './dto/AccountForPost';
import { AccountForToken } from './dto/AccountForToken';
import { AccountForFull } from './dto/AccountFull';
import { LocalAuthGuard } from './local-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileServiceS3 } from 'src/uploads3/uploads3.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private uploads3: UploadFileServiceS3,
  ) {}

  @Post('/register')
  @ApiBody({ type: AccountForPost })
  @ApiOkResponse({
    type: AccountForFull,
  })
  async register(@Body() accountForPost: AccountForPost) {
    console.log('step1: loading to create account...');
    return this.authService.register(accountForPost);
  }

  @ApiBody({ type: AccountForLogin })
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    type: AccountForLoginResponse,
  })
  @Post('/login')
  async login(@Request() req) {
    console.log('loading to login...');
    return await this.authService.login(req.user);
  }

  @ApiBearerAuth('Authorization')
  // define role can be assgined of end point
  @Roles(Role.User)
  // authen token in request and check role of request and role define in end point
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @ApiOkResponse({
    type: AccountForFull,
  })
  @Get('/profile')
  // define permision which user can do in this API
  @CheckAbilities({ action: Action.Read, subject: AccountForToken })
  // check permision of account in request and permission in API
  async getProfile(@Request() req) {
    return await this.authService.getProfileAccount(req?.user);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.uploads3.uploadFileToPublicBucket('/image/upload', {
      file,
      file_name: 'test',
    });
    return url;
  }
}
