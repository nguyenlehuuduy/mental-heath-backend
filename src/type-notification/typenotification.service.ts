import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TypeNotificationForCreate } from './dto/TypeNotificationForCreate';
import { TypeNotificationForUpdate } from './dto/TypeNotificationForUpdate';
import { TypeNotificationForResponse } from './dto/TypeNotificationForRespone';

@Injectable()
export class TypeNotificationService {
  constructor(private prismaService: PrismaService) {}

  async getAllTypeNoti(): Promise<Array<TypeNotificationForResponse>> {
    try {
      return this.prismaService.typeNotification.findMany();
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(
    createTypeNotification: TypeNotificationForCreate,
  ): Promise<TypeNotificationForResponse> {
    try {
      return await this.prismaService.typeNotification.create({
        data: {
          typeName: createTypeNotification.typeName,
          description: createTypeNotification.description,
          thumbnailNoti: createTypeNotification.thumbnailNoti,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    updateTypeNotification: TypeNotificationForUpdate,
    id: string,
  ): Promise<TypeNotificationForResponse> {
    try {
      return await this.prismaService.typeNotification.update({
        where: {
          id: id,
        },
        data: {
          description: updateTypeNotification.description,
          typeName: updateTypeNotification.typeName,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    try {
      return await this.prismaService.typeNotification.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
