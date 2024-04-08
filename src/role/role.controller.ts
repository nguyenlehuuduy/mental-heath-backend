import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoleForPost } from './dto/RoleForPost';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { RoleService } from './role.service';

@ApiTags('Role')
@Controller('roles')
@ApiBearerAuth('Authorization')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.User)
export class RoleController {
  constructor(private roleService: RoleService) { }
  @Get()
  async getAllRoles() {
    return await this.roleService.getAllRoles()
  }

  @Post()
  @ApiBody({ type: RoleForPost })
  async addOneRole(@Body() roleForPost: RoleForPost) {
    return await this.roleService.addNewRole(roleForPost);
  }

  @Patch(":id")
  @ApiBody({ type: RoleForPost })
  @ApiParam({ name: "id", required: true, description: "this is id of one role" })
  async updateOneRole(@Param('id') id: string, @Body() roleForUpdate: RoleForPost) {
    return await this.roleService.updateOneRole(id, roleForUpdate);
  }

  @Delete(":id")
  @ApiParam({ name: "idRole", required: true, description: "this is id of one role" })
  async deleteOneRole(@Param('id') idRole: string) {
    return await this.roleService.deleteOneRule(idRole);
  }
}
