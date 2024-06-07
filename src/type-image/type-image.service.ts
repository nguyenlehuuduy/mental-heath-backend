import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TypeImageForCreate } from './dto/TypeImageForCreate';
import { TypeImageForUpdate } from './dto/TypeImageForUpdate';
import { TypeImageForResponse } from './dto/TypeImageForResponse';

@Injectable()
export class TypeImageService {
  constructor(private prismaService: PrismaService) { }

  async getAllTypeNoti(): Promise<Array<TypeImageForResponse>> {
    try {
      return this.prismaService.typeImage.findMany();
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(
    createTypeImage: TypeImageForCreate,
  ): Promise<TypeImageForResponse> {
    try {
      return await this.prismaService.typeImage.create({
        data: {
          id: createTypeImage.id,
          typeImageName: createTypeImage.typeImageName,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    updateTypeImage: TypeImageForUpdate,
    id: string,
  ): Promise<TypeImageForResponse> {
    try {
      return await this.prismaService.typeImage.update({
        where: {
          id: id,
        },
        data: {
          typeImageName: updateTypeImage.typeImageName,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    try {
      return await this.prismaService.typeImage.delete({
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
