import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeNotification } from './dto/CreateTypeNotification';
import { UpdateTypeNotification } from './dto/UpdateTypeNotification';

@Injectable()
export class TypeNotificationService {
  constructor(private prismaService: PrismaService) { }

  async create(createTypeNotification: CreateTypeNotification): Promise<CreateTypeNotification> {
    try {
      return  await this.prismaService.typeNotification.create({
        data: {
          typeName: createTypeNotification.typeName,
          description: createTypeNotification.description,
          thumbnailNoti: createTypeNotification.thumbnailNoti,
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateTypeNotification: UpdateTypeNotification, id: string): Promise<UpdateTypeNotification> {
    try {
      return await this.prismaService.typeNotification.update({
        where: {
          id: id
        },
        data: {
          description: updateTypeNotification.description,
          typeName: updateTypeNotification.typeName,
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string){
    try {
      return await this.prismaService.typeNotification.delete({
        where: {
          id: id
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

}
