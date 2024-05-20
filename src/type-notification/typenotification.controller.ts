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
import { TypeNotificationService } from './typenotification.service';
import { TypeNotificationForCreate } from './dto/TypeNotificationForCreate';
import { TypeNotificationForUpdate } from './dto/TypeNotificationForUpdate';

@ApiTags('TypeNotification')
@Controller('type-notification')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.Admin)
export class TypeNotificationController {
  constructor(private typeNotificationService: TypeNotificationService) {}

  @Post()
  async createTypeNotification(
    @Body() typeNotification: TypeNotificationForCreate,
  ) {
    return await this.typeNotificationService.create(typeNotification);
  }

  @Patch(':id')
  async updateTypeNotification(
    @Body() updateTypeNotification: TypeNotificationForUpdate,
    @Param('id') id: string,
  ) {
    return await this.typeNotificationService.update(
      updateTypeNotification,
      id,
    );
  }

  @Delete(':id')
  async deleteTypeNotification(@Param('id') id: string) {
    return await this.typeNotificationService.delete(id);
  }

  @Get()
  async getAllTypeNotification() {
    return await this.typeNotificationService.getAllTypeNoti();
  }
}
