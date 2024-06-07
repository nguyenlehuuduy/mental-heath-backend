import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { TypeImageService } from './type-image.service';
import { TypeImageForCreate } from './dto/TypeImageForCreate';
import { TypeImageForUpdate } from './dto/TypeImageForUpdate';


@ApiTags('TypeImage')
@Controller('type-image')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.Admin)
export class TypeImageController {
  constructor(private typeImageService: TypeImageService) { }

  @Post()
  async createTypeImage(
    @Body() typeImage: TypeImageForCreate,
  ) {
    return await this.typeImageService.create(typeImage);
  }

  @Patch(':id')
  async updateTypeImage(
    @Body() updateTypeImage: TypeImageForUpdate,
    @Param('id') id: string,
  ) {
    return await this.typeImageService.update(
      updateTypeImage,
      id,
    );
  }

  @Delete(':id')
  async deleteTypeImage(@Param('id') id: string) {
    return await this.typeImageService.delete(id);
  }

  @Get()
  async getAllTypeImage() {
    return await this.typeImageService.getAllTypeNoti();
  }
}
