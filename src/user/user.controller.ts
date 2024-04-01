import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { UserService } from './user.service';
import {
  Action,
  CaslAbilityFactory,
} from 'src/casl/casl-ability.factory/casl-ability.factory';
import { UserForUpdate } from './dto/UserForUpdate';
import { AccountForToken } from 'src/auth/dto/AccountForToken';

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

  @Patch('/updateInfo/:id')
  @ApiBody({ type: UserForUpdate })
  async updateUser(
    @Body() userInfoRequest: UserForUpdate,
    @Param('id') userId: string,
  ) {
    try {
      const account = new AccountForToken();
      const infoUser = await this.userService.getDetailUserById(userId);
      account.id = infoUser.id;
      const ability = this.caslAbilityFactory.defineAbility(account);
      if (ability.can(Action.Update, account)) {
        return await this.userService.updateUser(userInfoRequest);
      }
      throw new HttpException(
        'You are not allowed to update this',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
