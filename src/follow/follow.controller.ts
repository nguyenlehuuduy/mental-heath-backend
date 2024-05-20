import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { UserForResponse } from 'src/user/dto/UserForResponse';
import { FollowForCreate } from './dto/FollowForCreate';
import { FollowForGet } from './dto/FollowForGet';
import { RequestFollowForResponse } from './dto/RequestFollowForResponse';
import { FollowService } from './follow.service';

@Controller('follow')
@ApiTags('follows')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.User)
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  @ApiOkResponse({
    type: FollowForGet,
  })
  async follow(@Body() data: FollowForCreate): Promise<FollowForGet> {
    return await this.followService.createRequestFollow(data);
  }

  @Delete(':id')
  async deleteRequestFollow(@Param('id') id: string) {
    return await this.followService.deleteRequestFollow(id);
  }

  @Post('accept/:id')
  async acceptRequestFollow(
    @Body() data: FollowForCreate,
    @Param('id') idRequestFollow: string,
  ) {
    return await this.followService.acceptRequestFollow(data, idRequestFollow);
  }

  @Delete('/unfollow/:id')
  async unFollow(@Param('id') id: string) {
    return await this.followService.unFollow(id);
  }

  @Get('/followings')
  @ApiOkResponse({
    type: [UserForResponse],
  })
  async getAllFollowingOfAccount(@Request() req) {
    return await this.followService.getAllFollowings(req?.user?.id);
  }

  @Get('/followers')
  @ApiOkResponse({
    type: [UserForResponse],
  })
  async getAllFollowerOfAccount(@Request() req) {
    return await this.followService.getAllFollowers(req?.user?.id);
  }

  @Get('/request-followers')
  @ApiOkResponse({
    type: [RequestFollowForResponse],
  })
  async getAllRequestFollowers(@Request() req) {
    return await this.followService.getAllRequestFollowers(req?.user?.id);
  }
}
