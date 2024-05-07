import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotification } from './dto/CreateNotification';
import { UpdateNotification} from './dto/UpdateNotification';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.User)
export class NotificationController {
  constructor(private notificationService: NotificationService) { }

  @Post()
  async createNotification(@Body() createNotification: CreateNotification) {
    return await this.notificationService.create(createNotification);
  }

  @Patch()
  async updateNotification(@Body() updateNotification: UpdateNotification,
    @Param('id') id: string) {
    return await this.notificationService.update(updateNotification, id);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    return await this.notificationService.delete(id);
  }
}
