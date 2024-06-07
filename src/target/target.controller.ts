import { Body, Controller, Post, UseGuards, Request, Get, Patch, Delete, Param } from '@nestjs/common';
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
@Roles(Role.User)
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class TargetController {
  constructor(
    private readonly targetService: TargetService,
  ) { }

  @Post()
  async createtarget(@Body() targetForCreate: TargetForCreate,
    @Request() req) {
    return await this.targetService.createTarget(targetForCreate, req?.user)
  }

  @Get()
  @Roles(Role.Admin)
  async gettargetByUserId() {
    return await this.targetService.getTarget()
  }

  @Patch(":id")
  async updatetarget(@Body() targetForUpdate: TargetForUpdate,
    @Request() req,
    @Param("id") id: string) {
    return await this.targetService.updateTarget(targetForUpdate, id)
  }

  @Delete(":id")
  async deletetarget(@Param("id") id: string) {
    return await this.targetService.deleteTarget(id)
  }
}