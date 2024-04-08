
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { TabMenuForPost } from './dto/TabMenuForPost';
import { TabMenuForGet } from './dto/TabMenuForGet';
import { TabMenuForUpdate } from './dto/TabMenuForUpdate';

@ApiTags('tab-menu')
@Controller('tab-menu')
@Roles(Role.Admin)

export class TabMenuController {
  @Post()
  @ApiBody({ type: TabMenuForPost })
  @ApiOkResponse({
    type: TabMenuForGet,
  })
  async createNewFeature() {

  }

  @Patch(":id")
  @ApiBody({ type: TabMenuForUpdate })
  @ApiQuery({ name: "id", description: "id of hot tab menu" })
  @ApiOkResponse({
    type: TabMenuForGet,
  })
  async updateFeature(@Param("id") id: string) {

  }

  @Get()
  @ApiOkResponse({
    type: [TabMenuForGet],
  })
  async getAllFeature() {

  }

  @Delete(":id")
  @ApiQuery({ name: "id", description: "id of hot tab menu" })
  @ApiOkResponse({
    type: TabMenuForGet,
  })
  async deleteFeature(@Param("id") id: string) {

  }
}
