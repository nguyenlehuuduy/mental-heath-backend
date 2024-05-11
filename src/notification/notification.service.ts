import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationForCreate } from './dto/NotificationForCreate';
import { NotificationForResponse } from './dto/NotificationForResponse';
import { NotificationForUpdate } from './dto/NotificationForUpdate';
import { AccountForToken } from 'src/auth/dto/AccountForToken';

@Injectable()
export class NotificationService {
  constructor(private prismaService: PrismaService) {}

  async create(
    notification: NotificationForCreate,
  ): Promise<NotificationForResponse> {
    try {
      return await this.prismaService.notification.create({
        data: {
          messageNotifications: notification.messageNotifications,
          typeNotificationId: notification.typeNotificationId,
          accountId: notification.accountId,
          postId: notification.postId,
          postShareId: notification.postShareId,
          commentId: notification.commentId,
          followerId: notification.followerId,
        },
      });
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
        where: { accountId: account.id },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
