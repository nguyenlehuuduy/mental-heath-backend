import { Body, Controller, Post, UseGuards, Get, Patch, Delete, Param, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { ActionUserService } from './action-user.service';
import { ActionUserForCreate } from './dto/ActionUserForCreate';
import { ActionUserForUpdate } from './dto/ActionUserForUpdate';

@ApiTags('action-user')
@Controller('action-user')
@ApiBearerAuth('Authorization')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.Admin)

export class ActionUserController {
    constructor(
      private readonly actionUserService: ActionUserService,
    ) { }

  @Post()
  @Roles(Role.User)
  async createActionUser(@Body() actionUserForCreate: ActionUserForCreate,
    @Request() req) {
    return await this.actionUserService.createActionUser(actionUserForCreate, req?.user)
  }

  @Get()
  async getActionUser() {
    return await this.actionUserService.getActionUser()
  }
  @Patch(":id")
  async updateActionUser(@Body() actionUserForUpdate: ActionUserForUpdate,
    @Param("id") id: string) {
    return await this.actionUserService.updateActionUser(actionUserForUpdate, id)
  }

  @Delete(":id")
  async deleteActionUser(@Param("id") id: string) {
    return await this.actionUserService.deleteActionUser(id)
  }
}
