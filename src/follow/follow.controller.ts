import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Role } from "src/decorator/role.enum";
import { Roles } from "src/decorator/roles.decorator";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { AuthorizationGuard } from "src/guard/authorization.guard";
import { FollowForCreate } from "./dto/FollowForCreate";
import { FollowService } from "./follow.service";

@Controller("follow")
@ApiTags("follows")
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.User)
export class FollowController {
  constructor(
    private readonly followService: FollowService,
  ) {}

  @Post()
  async follow(@Body() data: FollowForCreate): Promise<FollowForCreate> {
    return await this.followService.createRequestFollow(data);
  }

  @Delete(":id")
  async unAcceptRequestFollow(@Param("id") id: string) {
    return await this.followService.unAcceptRequestFollow(id);
  }

  @Post("accept")
  async acceptRequestFollow(@Body() data: FollowForCreate, idRequestFollow: string) {
    return await this.followService.acceptRequestFollow(data, idRequestFollow);
  }

  @Delete("/unfollow/:id")
  async unFollow(@Param("id") id: string) {
    return await this.followService.unFollow(id);
  }
}
