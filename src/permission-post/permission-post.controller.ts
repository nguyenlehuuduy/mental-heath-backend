import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PermissionPostService } from './permission-post.service';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { PermissionPostForPost } from './dto/PermissionPostForPost';
import { PermissionPostForPut } from './dto/PermissionPostForPut';

@Controller('permission-post')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.Admin)
export class PermissionPostController {
  constructor(private permissionPostService: PermissionPostService) { }

  @Post()
  async postPermissionPost(@Body() permission: PermissionPostForPost) {
    return await this.permissionPostService.createNewPermissionPost(permission);
  }

  @Roles(Role.User)
  @Get()
  async getAllPermissionPost() {
    return await this.permissionPostService.getAllPermissionPost();
  }

  @Patch(":id")
  async updatePermissionPost(@Body() permission: PermissionPostForPut, @Param("id") id: string) {
    return await this.permissionPostService.updatePermissionPostService(id, permission);
  }

  @Delete(":id")
  async deletePermissionPost(@Param("id") id: string) {
    return await this.permissionPostService.deleteFeatureService(id);
  }
}
