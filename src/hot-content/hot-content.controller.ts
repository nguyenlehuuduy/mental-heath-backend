
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, Request } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { HotContentForPost } from './dto/HotContentForPost';
import { HotContentForResponse } from './dto/HotContentForResponse';
import { HotContentForUpdate } from './dto/HotContentForUpdate';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { HotContentService } from './hot-content.service';
import { AccountForToken } from 'src/auth/dto/AccountForToken';

@ApiTags('hot-content')
@Controller('hot-content')
@Roles(Role.Admin)

export class HotContentController {

  constructor(
    private readonly hotContentService: HotContentService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}
  @Post()
  @ApiBody({ type: HotContentForPost })
  @ApiOkResponse({
    type: HotContentForResponse,
  })
  async createNewHotContent(@Body() hotContentForPost: HotContentForPost, @Request() req) {
    return await this.hotContentService.createHotContent(hotContentForPost);
  }

  @Patch(":id")
  @ApiBody({ type: HotContentForUpdate })
  @ApiQuery({ name: "id", description: "id of hot content" })
  @ApiOkResponse({
    type: HotContentForResponse,
  })
  async updateHotContent(@Param("id") id: string, @Body() hotContentRequest: HotContentForResponse, @Request() req) {
    const hotContent = new HotContentForResponse();
    const account = new AccountForToken();
    const hotContentDetail = await this.hotContentService.getDetailHotContent(hotContentRequest.id);
    hotContent.id = hotContentDetail.id;
    const ability = this.caslAbilityFactory.defineAbility(account);
    const permision = ability.can(Action.Update, hotContent);
    if (permision) {
      return await this.hotContentService.updateHotContent(hotContentRequest);
    }
    throw new HttpException('you have not permision', HttpStatus.UNAUTHORIZED);
  }

  @Get("hotcontent")
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
  async deleteHotContent(@Param("id") id: string, @Request() req) {
    const hotContent = new HotContentForResponse();
    const account = new AccountForToken();
    const hotContentDetail = await this.hotContentService.getDetailHotContent(id);
    hotContent.id = hotContentDetail.id;
    const ability = this.caslAbilityFactory.defineAbility(account);
    const permision = ability.can(Action.Delete, hotContent);
    if (permision) {
      return await this.hotContentService.deleteHotContent(id);
    }
    throw new HttpException('you have not permision', HttpStatus.UNAUTHORIZED);
  }
}
