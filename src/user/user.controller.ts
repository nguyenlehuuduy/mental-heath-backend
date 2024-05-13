import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import {
  Action,
  CaslAbilityFactory,
} from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { AdminAccountForPut } from './dto/AdminAccountForPut';
import { AdminAccountForResponse } from './dto/AdminAccountForResponse';
import { UserForResponse } from './dto/UserForResponse';
import { UserForUpdate } from './dto/UserForUpdate';
import { UserService } from './user.service';
import { Profile } from './dto/ProfileResponse';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth('Authorization')
@Roles(Role.User)
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Patch('/update-account-admin')
  @ApiOkResponse({
    type: AdminAccountForResponse,
  })
  @Roles(Role.Admin)
  async updateAdministratorAccount(
    @Body() accountForUpdateAdminRole: AdminAccountForPut,
  ) {
    return await this.userService.updateAdministratorAccount(
      accountForUpdateAdminRole,
    );
  }

  @Get('/suggest-follow')
  @ApiOkResponse({
    type: [UserForResponse],
  })
  async suggestFollowForAccount(@Request() req) {
    const { id } = req?.user;
    return await this.userService.getSuggestedFollowAccounts(id);
  }

  @Patch('/update-account')
  @ApiBody({ type: UserForUpdate })
  @ApiOkResponse({
    type: UserForResponse,
  })
  async updateUser(@Request() req, @Body() userForUpdate: UserForUpdate) {
    const { id } = req?.user;
    const infoUser = await this.userService.getDetailUserById(id);
    const { user } = infoUser;
    return await this.userService.updateUser(user.id, userForUpdate);
  }

  @Get('/my-account-profile')
  @ApiBody({ type: Profile })
  @ApiOkResponse({
    type: Profile,
  })
  async getProfile(@Request() req) {
    const { id } = req?.user;
    return await this.userService.getDetailUserById(id);
  }
  @Get('/other-account-profile/:id')
  @ApiBody({ type: Profile })
  @ApiOkResponse({
    type: Profile,
  })
  @ApiParam({ name: 'id', type: String })
  async getOtherAccountProfile(
    @Param('id') otherAccountId: string,
    @Request() req,
  ) {
    const { id } = req?.user;
    if (id === otherAccountId) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
    const is_follow = await this.userService.checkFollowShip(
      id,
      otherAccountId,
    );
    const profileOtherAccount =
      await this.userService.getDetailUserById(otherAccountId);

    return {
      profileOtherAccount,
      is_follow,
    };
  }
}
