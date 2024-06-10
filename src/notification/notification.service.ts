import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationForCreate } from './dto/NotificationForCreate';
import { NotificationForResponse } from './dto/NotificationForResponse';
import { NotificationForUpdate } from './dto/NotificationForUpdate';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { SocketIoGateway } from 'src/socket-io/socket-io.gateway';

@Injectable()
export class NotificationService {
  constructor(private prismaService: PrismaService,
    private socket: SocketIoGateway
  ) { }

  async create(
    notification: NotificationForCreate,
  ): Promise<NotificationForResponse> {
    try {
      const data = await this.prismaService.notification.create({
        data: {
          messageNotifications: notification.messageNotifications,
          typeNotificationId: notification.typeNotificationId,
          account: { connect: notification.accountId.map(item => ({ id: item })) },
          postId: notification.postId,
          postShareId: notification.postShareId,
          commentId: notification.commentId,
          followerId: notification.followerId,
        },
        select: {
          typeNotification: {
            select: {
              id: true,
              thumbnailNoti: true,
              typeName: true,
              description: true,
            }
          },
          postId: true,
          commentId: true,
          created_at: true,
          followerId: true,
          id: true,
          messageNotifications: true,
          postShareId: true,
          reactionId: true,
          updated_at: true,
        },
      });
      notification.accountId.map(item =>
        this.socket.sendNotificationFromAdmin(item, data)
      )
      return data
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    notification: NotificationForUpdate,
    id: string,
  ): Promise<NotificationForResponse> {
    try {
      return await this.prismaService.notification.update({
        where: {
          id,
        },
        data: {
          messageNotifications: notification.messageNotifications,
          typeNotificationId: notification.typeNotificationId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    try {
      return await this.prismaService.notification.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllNotifiAccount(
    account: AccountForToken,
  ): Promise<Array<NotificationForResponse>> {
    try {
      return await this.prismaService.notification.findMany({
        where: {
          account: {
            some: {
              id: account.id
            }
          }
        },
        select: {
          typeNotification: {
            select: {
              id: true,
              thumbnailNoti: true,
              typeName: true,
              description: true,
            }
          },
          postId: true,
          commentId: true,
          created_at: true,
          followerId: true,
          id: true,
          messageNotifications: true,
          postShareId: true,
          reactionId: true,
          updated_at: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }


  async getAllNotificationByAdmin(
  ): Promise<Array<NotificationForResponse>> {
    try {
      return await this.prismaService.notification.findMany({
        select: {
          typeNotification: {
            select: {
              id: true,
              thumbnailNoti: true,
              typeName: true,
              description: true,
            }
          },
          account: {
            select: {
              id: true,
              fullName: true,
            }
          },
          postId: true,
          commentId: true,
          created_at: true,
          followerId: true,
          id: true,
          messageNotifications: true,
          postShareId: true,
          reactionId: true,
          updated_at: true,
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
