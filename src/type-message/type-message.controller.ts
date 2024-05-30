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
import { TypeMessageForUpdate } from './dto/TypeMessageForUpdate';
import { TypeMessageForCreate } from './dto/TypeMessageForCreate';
import { TypeMessageService } from './type-message.service';

@ApiTags('TypeMessage')
@Controller('type-message')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.Admin)
export class TypeMessageController {
  constructor(private typeMessageService: TypeMessageService) {}

  @Post()
  async createTypeMessage(
    @Body() typeMessage: TypeMessageForCreate,
  ) {
    return await this.typeMessageService.create(typeMessage);
  }

  @Patch(':id')
  async updateTypeMessage(
    @Body() updateTypeMessage: TypeMessageForUpdate,
    @Param('id') id: string,
  ) {
    return await this.typeMessageService.update(
      updateTypeMessage,
      id,
    );
  }

  @Delete(':id')
  async deleteTypeMessage(@Param('id') id: string) {
    return await this.typeMessageService.delete(id);
  }

  @Get()
  async getAllTypeMessage() {
    return await this.typeMessageService.getAllTypeNoti();
  }
}
