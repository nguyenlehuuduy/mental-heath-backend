import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoleForPost } from './dto/RoleForPost';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { RoleService } from './role.service';
import { RoleForGet } from './dto/RoleForGet';

@ApiTags('Role')
@Controller('roles')
@ApiBearerAuth('Authorization')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.User)
export class RoleController {
  constructor(private roleService: RoleService) { }
  @Get()
  @ApiOkResponse({
    type: [RoleForGet],
  })
  async getAllRoles() {
    return await this.roleService.getAllRoles()
  }

  @Post()
  @ApiBody({ type: RoleForPost })
  @ApiOkResponse({
    type: RoleForGet,
  })
  async addOneRole(@Body() roleForPost: RoleForPost) {
    return await this.roleService.addNewRole(roleForPost);
  }

  @Patch(":id")
  @ApiBody({ type: RoleForPost })
  @ApiOkResponse({
    type: RoleForGet,
  })
  @ApiParam({ name: "id", required: true, description: "this is id of one role" })
  async updateOneRole(@Param('id') id: string, @Body() roleForUpdate: RoleForPost) {
    return await this.roleService.updateOneRole(id, roleForUpdate);
  }

  @Delete(":id")
  @ApiOkResponse({
    type: RoleForGet,
  })
  @ApiParam({ name: "id", required: true, description: "this is id of one role" })
  async deleteOneRole(@Param('id') idRole: string) {
    return await this.roleService.deleteOneRule(idRole);
  }
}
