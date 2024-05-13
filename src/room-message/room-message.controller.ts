import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { RoomMessageForPost } from './dto/RoomMessageForPost';
import { RoomMessageForGet } from './dto/RoomMessageForGet';
import { RoomMessageService } from './room-message.service';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';

@ApiTags('room-message')
@Controller('room-message')
@Roles(Role.User)
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class RoomMessageController {
  constructor(private roomMessageService: RoomMessageService) {}
  @Post()
  @ApiBody({ type: RoomMessageForPost })
  @ApiOkResponse({
    type: RoomMessageForGet,
  })
  async createNewRoomMessage(@Body() room: RoomMessageForPost, @Request() req) {
    return this.roomMessageService.postRoomMessage(room, req?.user);
  }

  @Get()
  @ApiOkResponse({
    type: [RoomMessageForGet],
  })
  async getAllValidRoomMessage(@Request() req) {
    return this.roomMessageService.getValidRoomMessage(req?.user);
  }

  @Get('chat-bot')
  async getAllRoomChatBot(@Request() req) {
    return this.roomMessageService.getRoomChatBot(req?.user);
  }

  @Get('messages/:id')
  async getAllMessageInRoom(@Param('id') id: string) {
    return this.roomMessageService.getAllMessageInRoom(id);
  }

  @Get(':id')
  async getInfRoom(@Param('id') id: string) {
    return this.roomMessageService.getInfRoom(id);
  }

  @Post('/send-message')
  @ApiOkResponse({
    type: [SendMessageForPost],
  })
  async sendMessageToRoom(@Request() req) {
    const { roomMessageId, contentMessage, typeMessageId } = req.body;
    const { id } = req?.user;
    return await this.roomMessageService.sendMessageToRoom(
      roomMessageId,
      contentMessage,
      id,
      typeMessageId,
    );
  }
}
