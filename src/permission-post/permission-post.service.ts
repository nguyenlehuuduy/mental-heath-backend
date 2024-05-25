import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionPostForGet } from './dto/PermissionPostForGet';
import { PermissionPostForPost } from './dto/PermissionPostForPost';
import { PermissionPostForPut } from './dto/PermissionPostForPut';

@Injectable()
export class PermissionPostService {
  constructor(private prismaService: PrismaService) { }
  async getAllPermissionPost(): Promise<PermissionPostForGet[]> {
    try {
      return await this.prismaService.permisionPost.findMany();
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createNewPermissionPost(
    permission: PermissionPostForPost,
  ): Promise<PermissionPostForGet> {
    try {
      return await this.prismaService.permisionPost.create({
        data: {
          code: permission.code,
          description: permission.description,
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePermissionPostService(
    id: string,
    permission: PermissionPostForPut,
  ): Promise<PermissionPostForGet> {
    try {
      return await this.prismaService.permisionPost.update({
        where: { id },
        data: {
          code: permission.code,
          description: permission.description
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteFeatureService(id: string): Promise<PermissionPostForGet> {
    try {
      return await this.prismaService.permisionPost.delete({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
