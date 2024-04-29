import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AccountForToken } from "src/auth/dto/AccountForToken";
import { Action, CaslAbilityFactory } from "src/casl/casl-ability.factory/casl-ability.factory";
import { Role } from "src/decorator/role.enum";
import { Roles } from "src/decorator/roles.decorator";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { AuthorizationGuard } from "src/guard/authorization.guard";
import { AdminAccountForPut } from "./dto/AdminAccountForPut";
import { AdminAccountForResponse } from "./dto/AdminAccountForResponse";
import { UserForResponse } from "./dto/UserForResponse";
import { UserForUpdate } from "./dto/UserForUpdate";
import { UserService } from "./user.service";

@ApiTags("user")
@Controller("user")
@ApiBearerAuth("Authorization")
@Roles(Role.User)
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Patch(":id")
  @ApiBody({ type: UserForUpdate })
  @ApiOkResponse({
    type: UserForResponse,
  })
  async updateUser(
    @Body() userInfoRequest: UserForUpdate,
    @Param("id") userId: string,
    @Request() req,
  ) {
    try {
      const account = new AccountForToken();
      account.id = req?.user?.id;
      const infoUser = await this.userService.getDetailUserById(userId);
      const accountInPermission = new UserForResponse();
      accountInPermission.id = infoUser?.id;
      const ability = this.caslAbilityFactory.defineAbility(account);
      if (ability.can(Action.Update, accountInPermission)) {
        return await this.userService.updateUser(userInfoRequest);
      }
      throw new HttpException(
        "You are not allowed to update this",
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/update-account-admin")
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

  @Get("/suggest-follow")
  async suggestFollowForAccount(@Request() req) {
    return await this.userService.getSuggestedFollowAccounts(req?.user?.id);
  }
}
