import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { TypeNotificationService } from './typenotification.service';
import { CreateTypeNotification } from './dto/CreateTypeNotification';
import { UpdateTypeNotification } from './dto/UpdateTypeNotification';

@ApiTags('typenotifications')
@Controller('typenotifications')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.Admin)
export class TypeNotificationController {
  constructor(private typenotificationService: TypeNotificationService) { }

  @Post()
  async createTypeNotification(@Body() createTypeNotification: CreateTypeNotification) {
    return await this.typenotificationService.create(createTypeNotification);
  }

  @Patch()
  async updateTypeNotification(@Body() updateTypeNotification: UpdateTypeNotification,
    @Param('id') id: string) {
    return await this.typenotificationService.update(updateTypeNotification, id);
  }

  @Delete(':id')
  async deleteTypeNotification(@Param('id') id: string) {
    return await this.typenotificationService.delete(id);
  }
}
