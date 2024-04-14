import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HotContentForResponse } from './dto/HotContentForResponse';
import { HotContentForPost } from './dto/HotContentForPost';


@Injectable()
export class HotContentService {
  constructor(private prismaService: PrismaService) { }
  async createHotContent(hotContentForPost: HotContentForPost): Promise<HotContentForResponse> {
    try {
      return await this.prismaService.HotContent.create({
        data: {
          title: hotContentForPost.title,
          thumbnailFileName: hotContentForPost.thumbnailFileName,
          url: hotContentForPost.url,
        },
        select: {
          id: true,
          title: true,
          thumbnailFileName: true,
          url : true,
          created_at: true,
          updated_at: true,
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getDetailHotContent(id: string): Promise<HotContentForResponse> {
    try {
      return await this.prismaService.HotContent.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateHotContent(hotContentForUpdate: HotContentForResponse): Promise<HotContentForResponse> {
    try {
      return await this.prismaService.HotContent.update({
        where: { id: hotContentForUpdate.id },
        data: {
          title: hotContentForUpdate.title,
          thumbnailFileName: hotContentForUpdate.thumbnailFileName,
          url: hotContentForUpdate.url,
        },
        select: {
          id: true,
          title: true,
          thumbnailFileName: true,
          url : true,
          created_at: true,
          updated_at: true,
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteHotContent(id: string): Promise<HotContentForResponse> {
    try {
      return await this.prismaService.HotContent.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getHotContents(): Promise<HotContentForResponse> {
    try {
      return await this.prismaService.HotContent.findMany({
        select: {
          id: true,
          title: true,
          thumbnailFileName: true,
          url : true,
        }
      }); 
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
