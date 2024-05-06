import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { DetailRoomMessage } from './dto/DetailRoomMessage';
import { SendMessageForPost } from './dto/ContentMessage';

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
    return await this.roomMessageService.postRoomMessage(room, req?.user);
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
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const allMessage =
        await this.roomMessageService.getAllMessageInRoomMessage(
          roomMessageId,
          page,
          limit,
        );
      return {
        data: allMessage,
        message: 'Get all message successful.',
        code: HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOkResponse({
    type: [SendMessageForPost],
  })
  async sendMessageToRoom(@Request() req) {
    try {
      const { roomMessageId, contentMessage } = req.body;
      const newMessage = await this.roomMessageService.sendMessageToRoom(
        roomMessageId,
        contentMessage,
        req?.user,
      );
      return {
        data: newMessage,
        message: 'Send message successful.',
        code: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
