import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { FollowForGet } from './dto/FollowForGet';
import { FollowForCreate } from './dto/FollowForCreate';


@Controller('follow')
@ApiTags('follows')
@Roles(Role.User)
@UseGuards(AuthenticationGuard, AuthorizationGuard)

export class FollowController {
    constructor(
      private readonly followService: FollowService) {}

  @Get("/request-follow-list")
  async requestFollowList(@Request() req): Promise<FollowForGet> {
    return await this.followService.requestFollows(req?.user?.id);
  }

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async follow(@Body() data ): Promise<FollowForCreate> {
    const senderId = data.senderId;
    const reciverId = data.reciverId;

    return await this.followService.createRequestFollow(senderId, reciverId);
  }

  @Delete(':id')
  async unAcceptRequestFollow(@Param('id') id: string) {
    return await this.followService.unAcceptRequestFollow(id);
  }

  @Post('accept')
  async acceptRequestFollow(@Body() data): Promise<FollowForCreate> {
    const senderId = data.senderId;
    const reciverId = data.reciverId;
    const id = data.id;
    
    return await this.followService.acceptRequestFollow(senderId, reciverId, id);
  }

  @Get("/follow-list")
  async followList(@Request() req): Promise<FollowForGet> {
    return await this.followService.follows(req?.user?.id);
  }

  @Delete("/unfollow/:id")
  async unFollow(@Param('id') id: string) {
    return await this.followService.unFollow(id);
  }

}
