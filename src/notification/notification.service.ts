import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNotification } from './dto/CreateNotification';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateNotification } from './dto/UpdateNotification';

@Injectable()
export class NotificationService {
  constructor(private prismaService: PrismaService) { }

  async create(createNotification: CreateNotification): Promise<CreateNotification> {
    try {
      return await this.prismaService.notification.create({
        data: {
          messageNotifications: createNotification.messageNotifications,
          typeNotificationId: createNotification.typeNotificationId,
          accountId: createNotification.accountId,
          postId: createNotification.postId,
          postShareId: createNotification.postShareId,
          commentId: createNotification.commentId,
          followerId: createNotification.followerId,
          created_at: createNotification.created_at,
          updated_at: createNotification.updated_at,
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateNotification: UpdateNotification, id: string): Promise<UpdateNotification> {
    try {
      return await this.prismaService.notification.update({
        where: {
          id
        },
        data: {
          messageNotifications: updateNotification.messageNotifications,
          typeNotificationId: updateNotification.typeNotificationId,
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string){
    try {
      return await this.prismaService.notification.delete({
        where: {
          id
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
