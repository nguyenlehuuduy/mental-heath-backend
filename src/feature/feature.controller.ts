import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FeatureForPost } from './dto/FeatureForPost';
import { FeatureForGet } from './dto/FeatureForGet';
import { FeatureForUpdate } from './dto/FeatureForUpdate';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { FeatureService } from './feature.service';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';

@ApiTags('feature')
@Controller('feature')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.User)
export class FeatureController {
  constructor(private readonly featureService: FeatureService) { }
  @Post()
  @ApiBody({ type: FeatureForPost })
  @ApiOkResponse({
    type: FeatureForGet,
  })
  async createNewFeature(@Body() featureForPost: FeatureForPost) {
    try {
      return await this.featureService.createNewFeatureService(featureForPost);
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @ApiBody({ type: FeatureForUpdate })
  @ApiQuery({ name: 'id', description: 'id of feature' })
  @ApiOkResponse({
    type: FeatureForGet,
  })
  async updateFeature(
    @Param('id') id: string,
    @Body() featureForUpdate: FeatureForUpdate,
  ) {
    try {
      return await this.featureService.updateFeatureService(
        id,
        featureForUpdate,
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get()
  @ApiOkResponse({
    type: [FeatureForGet],
  })
  async getAllFeature() {
    try {
      return await this.featureService.getAllFeaturesSevice();
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiQuery({ name: 'id', description: 'id of feature' })
  @ApiOkResponse({
    type: FeatureForGet,
  })
  async deleteFeature(@Param('id') id: string) {
    try {
      return await this.featureService.deleteFeatureService(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
