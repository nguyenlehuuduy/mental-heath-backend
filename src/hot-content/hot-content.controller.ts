
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { HotContentForPost } from './dto/HotContentForPost';
import { HotContentForGet } from './dto/HotContentForGet';
import { HotContentForUpdate } from './dto/HotContentForUpdate';

@ApiTags('hot-content')
@Controller('hot-content')
@Roles(Role.Admin)

export class HotContentController {
  @Post()
  @ApiBody({ type: HotContentForPost })
  @ApiOkResponse({
    type: HotContentForGet,
  })
  async createNewFeature() {

  }

  @Patch(":id")
  @ApiBody({ type: HotContentForUpdate })
  @ApiQuery({ name: "id", description: "id of hot content" })
  @ApiOkResponse({
    type: HotContentForGet,
  })
  async updateFeature(@Param("id") id: string) {

  }

  @Get()
  @ApiOkResponse({
    type: [HotContentForGet],
  })
  async getAllFeature() {

  }

  @Delete(":id")
  @ApiQuery({ name: "id", description: "id of feature" })
  @ApiOkResponse({
    type: HotContentForGet,
  })
  async deleteFeature(@Param("id") id: string) {

  }
}
