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
          thumbnailNoti: notification.thumbnailNoti,
          typeName: notification.typeName,
        },
        select: {
          accountId: true,
          commentId: true,
          created_at: true,
          followerId: true,
          id: true,
          messageNotifications: true,
          postId: true,
          postShareId: true,
          reactionId: true,
          thumbnailNoti: true,
          typeName: true,
          typeNotificationId: true,
          updated_at: true,
        }
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
          thumbnailNoti: notification.thumbnailNoti,
          typeName: notification.typeName,
        },
        select: {
          id: true,
          accountId: true,
          postId: true,
          postShareId: true,
          commentId: true,
          reactionId: true,
          followerId: true,
          messageNotifications: true,
          typeName: true,
          created_at: true,
          updated_at: true,
          typeNotificationId: true,
          thumbnailNoti: true,
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
