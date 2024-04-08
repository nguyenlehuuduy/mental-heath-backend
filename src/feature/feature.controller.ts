import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FeatureForPost } from './dto/FeatureForPost';
import { FeatureForGet } from './dto/FeatureForGet';
import { FeatureForUpdate } from './dto/FeatureForUpdate';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';

@ApiTags('feature')
@Controller('feature')
@Roles(Role.Admin)

export class FeatureController {
  @Post()
  @ApiBody({ type: FeatureForPost })
  @ApiOkResponse({
    type: FeatureForGet,
  })
  async createNewFeature() {

  }

  @Patch(":id")
  @ApiBody({ type: FeatureForUpdate })
  @ApiQuery({ name: "id", description: "id of feature" })
  @ApiOkResponse({
    type: FeatureForGet,
  })
  async updateFeature(@Param("id") id: string) {

  }

  @Get()
  @ApiOkResponse({
    type: [FeatureForGet],
  })
  async getAllFeature() {

  }

  @Delete(":id")
  @ApiQuery({ name: "id", description: "id of feature" })
  @ApiOkResponse({
    type: FeatureForGet,
  })
  async deleteFeature(@Param("id") id: string) {

  }
}
