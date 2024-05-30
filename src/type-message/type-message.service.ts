import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TypeMessageForResponse } from './dto/TypeMessageForRespone';
import { TypeMessageForCreate } from './dto/TypeMessageForCreate';
import { TypeMessageForUpdate } from './dto/TypeMessageForUpdate';


@Injectable()
export class TypeMessageService {
  constructor(private prismaService: PrismaService) {}

  async getAllTypeNoti(): Promise<Array<TypeMessageForResponse>> {
    try {
      return this.prismaService.typeMessage.findMany();
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(
    createTypeMessage: TypeMessageForCreate,
  ): Promise<TypeMessageForResponse> {
    try {
      return await this.prismaService.typeMessage.create({
        data: {
          nameTypeMessage: createTypeMessage.nameTypeMessage,
          descriptionTypeMessage: createTypeMessage.descriptionTypeMessage,
        },
        select: {
          id: true,
          nameTypeMessage: true,
          descriptionTypeMessage: true,
          created_at: true,
          updated_at: true,
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    updateTypeMessage: TypeMessageForUpdate,
    id: string,
  ): Promise<TypeMessageForResponse> {
    try {
      return await this.prismaService.typeMessage.update({
        where: {
          id: id,
        },
        data: {
          nameTypeMessage: updateTypeMessage.nameTypeMessage,
          descriptionTypeMessage: updateTypeMessage.descriptionTypeMessage,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    try {
      return await this.prismaService.typeMessage.delete({
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
