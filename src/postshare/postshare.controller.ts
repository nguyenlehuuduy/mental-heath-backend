import { Body, Controller, Post, UseGuards, Request, Get, Patch, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { PostshareForCreate } from './dto/PostshareForCreate';
import { PostshareService } from './postshare.service';
import { PostshareForUpdate } from './dto/PostshareForUpdate';

@ApiTags('postshare')
@Controller('postshare')
@ApiBearerAuth('Authorization')
@Roles(Role.User)
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class PostshareController {
  constructor(
    private readonly postshareService: PostshareService,
  ) { }

  @Post()
  async createPostshare(@Body() postshareForCreate: PostshareForCreate,
    @Request() req) {
    return await this.postshareService.createPostshare(postshareForCreate, req?.user)
  }

  @Get(":id")
  async getPostshareByUserId(@Param(":id") id: string,
    @Request() req) {
    return await this.postshareService.getPostshareByUserId(id, req?.user)
  }

  @Patch("/:id")
  async updatePostshare(@Body() postshareForUpdate: PostshareForUpdate,
    @Request() req,
    @Param("id") id: string) {
    return await this.postshareService.updatePostshare(postshareForUpdate, id)
  }

  @Delete(":id")
  async deletePostshare(@Param("id") id: string) {
    return await this.postshareService.deletePostshare(id)
  }

}
