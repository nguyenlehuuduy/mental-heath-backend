import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { TabMenuForPost } from './dto/TabMenuForPost';
import { TabMenuForGet } from './dto/TabMenuForGet';
import { TabMenuForUpdate } from './dto/TabMenuForUpdate';
import { TabMenuService } from './tab-menu.service';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';

@ApiTags('tab-menu')
@Controller('tab-menu')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class TabMenuController {
  constructor(private tabMenuService: TabMenuService) {}
  @Roles(Role.Admin)
  @Post()
  @ApiBody({ type: TabMenuForPost })
  @ApiOkResponse({
    type: TabMenuForGet,
  })
  async createNewTabMenu(@Body() tabmenu: TabMenuForPost) {
    return await this.tabMenuService.createNewTabMenu(tabmenu);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @ApiBody({ type: TabMenuForUpdate })
  @ApiQuery({ name: 'id', description: 'id of hot tab menu' })
  @ApiOkResponse({
    type: TabMenuForGet,
  })
  async updateFeature(
    @Param('id') id: string,
    @Body() tabmenu: TabMenuForUpdate,
  ) {
    return await this.tabMenuService.updateTabMenu(id, tabmenu);
  }

  @Roles(Role.Admin, Role.User)
  @Get()
  @ApiOkResponse({
    type: [TabMenuForGet],
  })
  async getAllTabMenu() {
    return await this.tabMenuService.getAllTabMenu();
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiQuery({ name: 'id', description: 'id of hot tab menu' })
  @ApiOkResponse({
    type: TabMenuForGet,
  })
  async deleteTabMenu(@Param('id') id: string) {
    return await this.tabMenuService.deleteTabMenu(id);
  }
}
