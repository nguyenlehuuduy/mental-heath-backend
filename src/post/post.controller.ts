import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get("/mock-data")
  async getMockDataNormalPost() {
    console.log("loading to mock...")
    return await this.postService.mockDataFaker();
  }

  @Get("/valid-post")
  @ApiBearerAuth('Authorization')
  @Roles(Role.User)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async getValidPostByUser(@Request() req) {
    return await this.postService.getValidPostByAccount(req?.user?.id)
  }
}
