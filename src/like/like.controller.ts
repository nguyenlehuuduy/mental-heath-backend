import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { LikeForPost } from './dto/LikeForPost';
import { LikeForGet } from './dto/LikeForGet';
@Controller('likes')
@ApiBearerAuth('Authorization')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.User)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}
  @ApiBody({ type: LikeForPost })
  @Post()
  async updateStatusLikes(
    @Body() likeForPost: LikeForPost,
    @Request() req,
  ): Promise<LikeForGet> {
    return await this.likeService.updateStatusLikes(likeForPost, req?.user);
  }
}
