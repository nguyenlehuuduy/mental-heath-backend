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
import { SendMessageForPost } from './dto/ContentMessage';
import { DetailRoomMessage } from './dto/AllMessageInRoom';

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
  async createNewRoomMessage(@Request() req) {
    const { chatPartnerId } = req.body;
    return await this.roomMessageService.postRoomMessage(
      chatPartnerId,
      req?.user,
    );
  }

  @Get()
  @ApiOkResponse({
    type: [RoomMessageForGet],
  })
  async getAllValidRoomMessage(@Request() req) {
    return await this.roomMessageService.getValidRoomMessage(req?.user);
  }

  @Get(':id')
  @ApiOkResponse({
    type: [DetailRoomMessage],
  })
  async getAllMessageInRoomMessage(
    @Param('id') roomMessageId: string,
    @Request() req,
  ) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    return await this.roomMessageService.getAllMessageInRoomMessage(
      roomMessageId,
      page,
      limit,
    );
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
