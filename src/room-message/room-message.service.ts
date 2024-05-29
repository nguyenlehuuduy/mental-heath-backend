import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomMessageForPost } from './dto/RoomMessageForPost';
import { RoomMessageForGet } from './dto/RoomMessageForGet';
import { RoomChatBotForGet } from './dto/RoomChatBotForGet';
import { MessageForResponse } from './dto/MessageForResponse';
import { RoomBotInfForResponse } from './dto/RoomBotInfForResponse';
import { SendMessageForPost } from './dto/ContentMessage';
import { SocketIoGateway } from 'src/socket-io/socket-io.gateway';

@Injectable()
export class RoomMessageService {
  constructor(
    private prismaService: PrismaService,
    private socketGateway: SocketIoGateway
  ) { }
  async postRoomMessage(
    room: RoomMessageForPost,
    account: AccountForToken,
  ): Promise<RoomMessageForGet> {
    try {
      const existRoom = await this.prismaService.roomMessage.findFirst({
        where: {
          accountInRoom: {
            every: {
              id: {
                in: room.accountInRoom,
              },
            },
          },
        },
      });

      if (!existRoom || room.accountInRoom.includes('0308051202024GZMTH')) {
        const result = await this.prismaService.roomMessage.create({
          data: {
            accountInRoom: { connect: { id: account.id } },
            nameRoom: room.name ?? '',
          },
          select: {
            id: true,
            created_at: true,
            updated_at: true,
            accountInRoom: {
              select: { fullName: true, email: true, id: true },
            },
            nameRoom: true,
          },
        });
        room.accountInRoom.map(async (item) => {
          await this.prismaService.roomMessage.update({
            data: { accountInRoom: { connect: { id: item } } },
            where: { id: result.id },
          });
        });
        return result;
      } else {
        throw new HttpException('room id was exist', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getValidRoomMessage(
    account: AccountForToken,
  ): Promise<Array<RoomMessageForGet>> {
    try {
      const allRoomValid = await this.prismaService.roomMessage.findMany({
        where: {
          accountInRoom: {
            some: { id: account.id },
          },
        },
        select: {
          id: true,
          created_at: true,
          updated_at: true,
          accountInRoom: {
            select: { fullName: true, email: true, id: true },
          },
        },
      });
      return allRoomValid.map((item) => {
        return {
          ...item,
          nameRoom: item.accountInRoom
            .map((item) => item.id !== account.id && item.fullName)
            .filter(Boolean)
            .join(','),
        };
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getRoomChatBot(
    account: AccountForToken,
  ): Promise<Array<RoomChatBotForGet>> {
    try {
      const allRoomValid = await this.prismaService.roomMessage.findMany({
        where: {
          accountInRoom: {
            some: { id: account.id },
          },
          AND: {
            accountInRoom: {
              some: { id: process.env.ID_CHAT_BOT },
            },
          },
        },
        select: {
          id: true,
          created_at: true,
          updated_at: true,
          nameRoom: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      });
      return allRoomValid;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllMessageInRoom(id: string): Promise<Array<MessageForResponse>> {
    try {
      return await this.prismaService.messages.findMany({
        where: {
          roomId: id,
        },
        select: {
          id: true,
          owner: {
            select: {
              id: true,
              fullName: true,
              email: true,
              avata: true,
            },
          },
          ownerId: true,
          roomId: true,
          created_at: true,
          updated_at: true,
          contentText: true,
        },
        orderBy: { created_at: 'asc' },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getInfRoom(id: string): Promise<RoomBotInfForResponse> {
    try {
      return await this.prismaService.roomMessage.findUnique({
        where: { id },
        select: {
          id: true,
          nameRoom: true,
          created_at: true,
          accountInRoom: {
            select: {
              fullName: true,
              id: true,
              nickName: true,
              avata: true,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async sendMessageToRoom(
    account: AccountForToken,
    message: SendMessageForPost,
  ): Promise<MessageForResponse> {
    try {
      const response = await this.prismaService.messages.create({
        data: {
          ownerId: account.id,
          roomId: message.roomId,
          contentText: message.contentMessage,
          typeMessageId: message.typeMessageId,
        },
        select: {
          id: true,
          ownerId: true,
          owner: {
            select: {
              id: true,
              fullName: true,
              email: true,
              avata: true,
            },
          },
          contentText: true,
          roomId: true,
          created_at: true,
          updated_at: true,
        },
      });
      //demo
      this.socketGateway.sendMessage(response.roomId, {
        authorId: '1',
        conversationId: '2',
        createdAt: '3',
        id: '4',
        message: 'chao may',
        updatedAt: '1312',
      })
      return response;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
