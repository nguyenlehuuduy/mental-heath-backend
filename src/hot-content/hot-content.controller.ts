
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { HotContentForPost } from './dto/HotContentForPost';
import { HotContentForResponse } from './dto/HotContentForResponse';
import { HotContentForUpdate } from './dto/HotContentForUpdate';
import { HotContentService } from './hot-content.service';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';

@ApiTags('hot-content')
@Controller('hot-content')
@Roles(Role.Admin)
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class HotContentController {
  constructor(
    private readonly hotContentService: HotContentService,
  ) { }
  @Post()
  @ApiBody({ type: HotContentForPost })
  @ApiOkResponse({
    type: HotContentForResponse,
  })
  async createNewHotContent(@Body() hotContentForPost: HotContentForPost) {
    return await this.hotContentService.createHotContent(hotContentForPost);
  }

  @Patch(":id")
  @ApiBody({ type: HotContentForUpdate })
  @ApiQuery({ name: "id", description: "id of hot content" })
  @ApiOkResponse({
    type: HotContentForResponse,
  })
  async updateHotContent(@Param("id") id: string, @Body() hotContentRequest: HotContentForUpdate) {
    return await this.hotContentService.updateHotContent(id, hotContentRequest);
  }

  @Get()
  @ApiOkResponse({
    type: [HotContentForResponse],
  })
  async getAllHotContent(@Request() req) {
    return await this.hotContentService.getHotContents();
  }

  @Delete(":id")
  @ApiQuery({ name: "id", description: "id of HotContent" })
  @ApiOkResponse({
    type: HotContentForResponse,
  })
  async deleteHotContent(@Param("id") id: string) {
    return await this.hotContentService.deleteHotContent(id);
  }
}
