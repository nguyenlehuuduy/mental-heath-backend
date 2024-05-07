import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomMessageForGet } from './dto/RoomMessageForGet';
import { SendMessageForPost } from './dto/ContentMessage';
import { DetailRoomMessage } from './dto/AllMessageInRoom';

@Injectable()
export class RoomMessageService {
  constructor(private prismaService: PrismaService) {}
  async postRoomMessage(
    chatPartnerId: string,
    account: AccountForToken,
  ): Promise<RoomMessageForGet> {
    try {
      const existingRoom = await this.prismaService.roomMessage.findFirst({
        where: {
          AND: [
            { accountInRoom: { some: { id: chatPartnerId } } },
            { accountInRoom: { some: { id: account.id } } },
          ],
        },
      });
      if (!existingRoom) {
        const result = await this.prismaService.roomMessage.create({
          data: {
            accountInRoom: {
              connect: [{ id: account.id }, { id: chatPartnerId }],
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
        return result;
      } else {
        throw new HttpException(
          'Room Message was exist',
          HttpStatus.BAD_REQUEST,
        );
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
      console.log(allRoomValid);

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

  async getAllMessageInRoomMessage(
    roomMessageId: string,
    page: number,
    limit: number,
  ): Promise<Array<DetailRoomMessage>> {
    try {
      const allMessageInRoom = await this.prismaService.messages.findMany({
        where: {
          roomId: roomMessageId,
        },
      });
      if (allMessageInRoom.length === 0) {
        throw new HttpException(
          'No messages found for the specified room.',
          HttpStatus.NOT_FOUND,
        );
      }
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedMessages = allMessageInRoom.slice(startIndex, endIndex);
      return paginatedMessages;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async sendMessageToRoom(
    roomMessageId: string,
    contentMessage: string,
    accountId: string,
    typeMessageId: string,
  ): Promise<SendMessageForPost> {
    try {
      return await this.prismaService.messages.create({
        data: {
          ownerId: accountId,
          roomId: roomMessageId,
          contentMessage: contentMessage,
          typeMessageId: typeMessageId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
