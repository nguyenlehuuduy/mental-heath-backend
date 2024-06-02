import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  Get,
  Request,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { NotificationForCreate } from './dto/NotificationForCreate';
import { NotificationForUpdate } from './dto/NotificationForUpdate';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.User)
export class NotificationController {
  constructor(private notificationService: NotificationService) { }

  @Post()
  async createNotification(@Body() notification: NotificationForCreate) {
    return await this.notificationService.create(notification);
  }

  @Patch(':id')
  async updateNotification(
    @Body() notification: NotificationForUpdate,
    @Param('id') id: string,
  ) {
    return await this.notificationService.update(notification, id);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    return await this.notificationService.delete(id);
  }

  @Get()
  async getAllNotificationByAccount(@Request() req) {
    return await this.notificationService.getAllNotifiAccount(req?.user);
  }

  @Roles(Role.Admin)
  @Get("/admin")
  async getAllNotificationByAdmin() {
    return await this.notificationService.getAllNotificationByAdmin();
  }
}
