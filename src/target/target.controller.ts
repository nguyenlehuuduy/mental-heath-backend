import { Body, Controller, Post, UseGuards, Get, Patch, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { TargetService } from './target.service';
import { TargetForCreate } from './dto/TargetForCreate';
import { TargetForUpdate } from './dto/TargetForUpdate';

@ApiTags('target')
@Controller('target')
@ApiBearerAuth('Authorization')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.Admin)

export class TargetController {
  constructor(
    private readonly targetService: TargetService,
  ) { }

  @Post()
  @Roles(Role.User)
  async createTarget(@Body() targetForCreate: TargetForCreate) {
    return await this.targetService.createTarget(targetForCreate)
  }

  @Get()
  async getTargetByUserId() {
    return await this.targetService.getTarget()
  }
  @Patch(":id")
  async updateTarget(@Body() targetForUpdate: TargetForUpdate,
    @Param("id") id: string) {
    return await this.targetService.updateTarget(targetForUpdate, id)
  }

  @Delete(":id")
  async deleteTarget(@Param("id") id: string) {
    return await this.targetService.deleteTarget(id)
  }
}